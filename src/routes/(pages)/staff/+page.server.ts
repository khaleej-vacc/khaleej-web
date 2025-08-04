import type { PageServerLoad } from './$types';
import type { StaffMember } from '$lib/types';

import { CDN_HOSTNAME } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const cdn = new URL('https://' + CDN_HOSTNAME);

	let staff: Array<{ [key: string]: StaffMember[] }> | null = null;
    
	try {
		const response = await fetch(new URL('/staff/members.json', cdn));

		if (!response.ok) throw new Error(`[${url.pathname}] Error Fetching Staff Members: ${response.status}: ${response.statusText}`);

		staff = await response.json();
	} catch (err) {
		// We only log the error as the data is sent as null to the client
		console.error(`[${url.pathname}] Error Fetching Staff Members:`);
		console.error(err);
	}

	return { staff };
};
