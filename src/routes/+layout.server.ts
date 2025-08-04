import type { LayoutServerLoad } from './$types';
import type { VatsimEvent } from '$lib/types';

import { VATSIM_HOSTNAME } from '$env/static/private';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
	const api = new URL('https://' + VATSIM_HOSTNAME);

	let events: VatsimEvent[] | null = null;

	try {
		const response = await fetch(new URL('api/v2/events/view/division/mena', api), { headers: { Accept: 'application/json' } });

		if (!response.ok) throw new Error(`[${url.pathname}] Error Fetching Events: ${response.status}: ${response.statusText}`);

		const { data }: { data: VatsimEvent[] } = await response.json();

		events = data.filter((event) => event.airports.some((airport) => airport.icao == 'OBBI' || airport.icao == 'OKKK'));
	} catch (err) {
		console.error(`[${url.pathname}] Error Fetching Events:`);
		console.error(err);
	}

	return { events };
};
