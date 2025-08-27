import type { PageServerLoad } from './$types';
import type { Controller } from '$lib/types';

import { CDN_HOSTNAME } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const cdn = new URL('https://' + CDN_HOSTNAME);

	let residents: Controller[] | null = null;
	let visitors: Controller[] | null = null;

	try {
		const [resResponse, visResponse] = await Promise.all([
			fetch(new URL('/atc/roster/residents.json', cdn)),
			fetch(new URL('/atc/roster/visitors.json', cdn))
		]);

		if (!resResponse.ok) throw new Error(`[${url.pathname}] Error Fetching Residents: ${resResponse.status}: ${resResponse.statusText}`);
		if (!visResponse.ok) throw new Error(`[${url.pathname}] Error Fetching Visitors: ${visResponse.status}: ${visResponse.statusText}`);

		residents = await resResponse.json();
		visitors = await visResponse.json();
	} catch (err) {
		// We only log the error as the data is sent as null to the client
		console.error(`[${url.pathname}] Error Fetching ATC Roster:`);
		console.error(err);
	}

	return { residents, visitors };
};
