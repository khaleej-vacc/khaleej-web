import type { PageServerLoad } from './$types';

type FirCode = 'OTDF' | 'OBBB';

type SectorFileRelease = {
	code: FirCode;
	name: string;
	url: string;
	packageName: string | null;
	airac: string | null;
	version: string | null;
	released: string | null;
	available: boolean;
};

const FIR_CONFIG: Array<Pick<SectorFileRelease, 'code' | 'name' | 'url'>> = [
	{
		code: 'OTDF',
		name: 'Doha FIR (OTDF)',
		url: 'https://files.aero-nav.com/OTDF'
	},
	{
		code: 'OBBB',
		name: 'Bahrain FIR (OBBB)',
		url: 'https://files.aero-nav.com/OBBB'
	}
];

function decodeHtml(value: string): string {
	return value
		.replace(/&nbsp;|&#160;/gi, ' ')
		.replace(/&amp;/gi, '&')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#39;|&apos;/gi, "'")
		.replace(/&#(\d+);/g, (_match, decimal: string) =>
			String.fromCodePoint(Number(decimal))
		)
		.replace(/&#x([\da-f]+);/gi, (_match, hex: string) =>
			String.fromCodePoint(parseInt(hex, 16))
		);
}

function cellText(html: string): string {
	return decodeHtml(
		html
			.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
			.replace(/<br\s*\/?>/gi, ' ')
			.replace(/<[^>]*>/g, ' ')
			.replace(/\s+/g, ' ')
	).trim();
}

function parseLatestPackage(html: string): Pick<
	SectorFileRelease,
	'packageName' | 'airac' | 'version' | 'released'
> | null {
	const rows = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];

	for (const rowMatch of rows) {
		const cellMatches = [...rowMatch[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)];
		if (cellMatches.length < 4) continue;

		const values = cellMatches.map((cell) => cellText(cell[1]));
		const airacIndex = values.findIndex((value) => /^\d{4}\s*\/\s*\d{2}$/.test(value));
		const releasedIndex = values.findIndex((value) => /\b\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\b/.test(value));

		// A valid package row has both an AIRAC identifier and a release timestamp.
		if (airacIndex < 0 || releasedIndex < 0 || releasedIndex <= airacIndex) continue;

		const airac = values[airacIndex];
		const releasedMatch = values[releasedIndex].match(/\b\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\b/);
		if (!releasedMatch) continue;

		return {
			packageName: airacIndex > 0 ? values[airacIndex - 1] || null : null,
			airac,
			version: releasedIndex > airacIndex + 1 ? values[releasedIndex - 1] || null : null,
			released: releasedMatch[0]
		};
	}

	return null;
}

async function getReleaseMetadata(
	fetcher: typeof fetch,
	fir: (typeof FIR_CONFIG)[number]
): Promise<SectorFileRelease> {
	try {
		const response = await fetcher(fir.url, {
			headers: {
				Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-GB,en;q=0.9',
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
				Referer: 'https://files.aero-nav.com/'
			},
			cache: 'no-store',
			redirect: 'follow'
		});

		if (!response.ok) {
			throw new Error(`AeroNav returned HTTP ${response.status} for ${fir.code}`);
		}

		const html = await response.text();
		const latest = parseLatestPackage(html);

		if (!latest) {
			const contentType = response.headers.get('content-type') ?? 'unknown content type';
			const pageTitle = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
			throw new Error(
				`Could not parse ${fir.code} package row (content-type: ${contentType}; title: ${pageTitle ? cellText(pageTitle) : 'no title'}; response length: ${html.length})`
			);
		}

		return { ...fir, ...latest, available: true };
	} catch (error) {
		console.error(`Failed to retrieve ${fir.code} sector-file metadata from AeroNav:`, error);
		return {
			...fir,
			packageName: null,
			airac: null,
			version: null,
			released: null,
			available: false
		};
	}
}

export const load: PageServerLoad = async ({ fetch }) => {
	const firs = await Promise.all(FIR_CONFIG.map((fir) => getReleaseMetadata(fetch, fir)));

	return {
		firs,
		checkedAt: new Date().toISOString()
	};
};
