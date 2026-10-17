<script lang="ts">
	import { onMount } from 'svelte';
	import { Map, Plane, ExternalLink, PlaneLanding, PlaneTakeoff } from 'lucide-svelte';
	import bgImage from '$lib/assets/images/airports.png?enhanced';

	type AirportTraffic = {
		arrivals: number;
		departures: number;
	};

	let trafficByAirport: Record<string, AirportTraffic> = {};
	let trafficAvailable = false;
	let lastUpdated: Date | null = null;

	const firSections = [
		{
			name: 'Doha FIR',
			airports: [
				{
					icao: 'OTHH',
					name: 'Hamad International Airport',
					url: 'https://docs.khaleejvacc.net/Pilot-Briefings/Hamad_International_Airport/GeneralInformation/'
				},
				{
					icao: 'OTBD',
					name: 'Doha International Airport',
					url: 'https://docs.khaleejvacc.net/Pilot-Briefings/Doha_International_Airport/GeneralInformation/'
				}
			]
		},
		{
			name: 'Bahrain FIR',
			airports: [
				{
					icao: 'OBBI',
					name: 'Bahrain International Airport',
					url: 'https://docs.khaleejvacc.net/Pilot-Briefings/Bahrain_International_Airport/GeneralInformation/'
				}
			]
		}
	];

	// Fetch the live VATSIM data feed and count aircraft by airport.
	onMount(() => {
		let disposed = false;
		let updating = false;

		async function updateTraffic() {
			if (updating) return;
			updating = true;

			try {
				const response = await fetch(
					'https://data.vatsim.net/v3/vatsim-data.json'
				);

				if (!response.ok) {
					throw new Error(`VATSIM API returned ${response.status}`);
				}

				const data = await response.json();

				if (!Array.isArray(data.pilots)) {
					throw new Error('Invalid VATSIM data response');
				}

				const counts: Record<string, AirportTraffic> = {};

				for (const fir of firSections) {
					for (const airport of fir.airports) {
						counts[airport.icao] = {
							arrivals: 0,
							departures: 0
						};
					}
				}

				for (const pilot of data.pilots) {
					const flightPlan = pilot.flight_plan;

					if (!flightPlan) continue;

					const departure = flightPlan.departure
						?.trim()
						.toUpperCase();

					const arrival = flightPlan.arrival
						?.trim()
						.toUpperCase();

					if (departure && counts[departure]) {
						counts[departure].departures++;
					}

					if (arrival && counts[arrival]) {
						counts[arrival].arrivals++;
					}
				}

				if (!disposed) {
					trafficByAirport = counts;
					trafficAvailable = true;
					lastUpdated = new Date();
				}
			} catch (error) {
				console.error('Failed to fetch VATSIM traffic:', error);
			} finally {
				updating = false;
			}
		}

		void updateTraffic();

		// Refresh every 60 seconds.
		const interval = setInterval(() => {
			void updateTraffic();
		}, 60_000);

		return () => {
			disposed = true;
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Khaleej vACC</title>
	<meta
		name="description"
		content="Airport information, briefing resources and live VATSIM traffic for Doha FIR and Bahrain FIR."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="min-h-screen bg-base-300 text-base-content font-['Ubuntu']">
	<!-- Page header -->
	<section class="relative isolate min-h-[34vh] bg-cover bg-center bg-no-repeat">
		<enhanced:img
			src={bgImage}
			alt="Airport background"
			class="absolute inset-0 -z-20 h-full w-full object-cover object-center"
		/>

		<div class="absolute inset-0 -z-10 bg-black/60"></div>

		<div class="container mx-auto px-5">
			<div class="flex min-h-[34vh] flex-col justify-center py-12">
				<div class="flex items-center gap-3 text-secondary">
					<Map size={32} />

					<h1 class="text-3xl font-bold md:text-4xl">
						Airports & Charts
					</h1>
				</div>

				<p class="mt-4 max-w-xl text-base text-white/75">
					Airport information and briefing resources across Khaleej vACC.
				</p>
			</div>
		</div>

		<div
			class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-base-300"
		></div>
	</section>

	<!-- Airport directory -->
	<section class="bg-base-300 py-10 md:py-14">
		<div class="container mx-auto px-5">
			<!-- Airport directory heading -->
			<div class="mb-10">
				<h2 class="text-xl font-semibold">Airport directory</h2>
				<p class="mt-1 text-sm text-base-content/60">
					Select an airport to access its briefing documentation.
				</p>
			</div>

			<!-- FIR sections -->
			<div class="space-y-12">
				{#each firSections as fir}
					<section>
						<div class="mb-5 flex items-center justify-between border-b border-base-content/10 pb-4">
							<div>
								<h2 class="text-2xl font-semibold">
									{fir.name}
								</h2>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							{#each fir.airports as airport}
								<a
									href={airport.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group flex min-h-32 items-start gap-4 rounded-lg border border-base-content/10 bg-base-100 p-5 transition-colors hover:border-base-content/25 hover:bg-base-200"
								>
									<div class="min-w-0 flex-1">
										<div class="flex items-center justify-between gap-3">
											<h3 class="text-lg font-semibold tracking-wide">
												{airport.icao}
											</h3>

											<ExternalLink
												size={16}
												class="shrink-0 text-base-content/40 transition-colors group-hover:text-base-content"
											/>
										</div>

										<p class="mt-1 text-sm text-base-content/75">
											{airport.name}
										</p>

										<!-- Live traffic counts -->
										<div class="mt-4 flex flex-wrap gap-3">
											<div class="flex w-fit items-center gap-2 rounded-md bg-base-300/70 px-3 py-2 text-base-content/60">
												<PlaneLanding size={18} />
												<p class="text-xl font-semibold tabular-nums">
													{#if trafficAvailable}
														{trafficByAirport[airport.icao]?.arrivals ?? 0}
													{:else}
														—
													{/if}
												</p>
											</div>

											<div class="flex w-fit items-center gap-2 rounded-md bg-base-300/70 px-3 py-2 text-base-content/60">
												<PlaneTakeoff size={18} />
												<p class="text-xl font-semibold tabular-nums">
													{#if trafficAvailable}
														{trafficByAirport[airport.icao]?.departures ?? 0}
													{:else}
														—
													{/if}
												</p>
											</div>
										</div>
									</div>
								</a>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		</div>
	</section>
</main>