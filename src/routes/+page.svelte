<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	import Events from '$lib/components/Events.svelte';

	import bgImage from '$lib/assets/images/bg.png?enhanced';
	import vatsimLogo from '$lib/assets/images/partners/vatsim.png?enhanced';
	import hawkskullzLogo from '$lib/assets/images/partners/hawkskullz.png?enhanced';
	import gulfSkiesLogo from '$lib/assets/images/partners/gulfskies.png?enhanced';

	let { data }: PageProps = $props();

	type Controller = {
		callsign: string;
		frequency: string;
		facility: number;
		name: string;
		logon_time: string;
	};

	let controllers: Controller[] = $state([]);
	let controllersLoaded = $state(false);
	let controllersError = $state(false);

	const stationNames: Record<string, string> = {
		OTHH_1_TWR: 'Hamad Tower | East',
		OTHH_2_TWR: 'Hamad Tower | West',
		OTBD_1_TWR: 'Doha Tower',
		OTBD_1X_TWR: 'Doha Tower',
		OTBH_TWR: 'Al-Udaid Tower',

		OTHH_1_GND: 'Hamad Ground | East',
		OTHH_1X_GND: 'Hamad Ground',
		OTHH_2_GND: 'Hamad Ground | Central',
		OTHH_3_GND: 'Hamad Ground | West',
		OTHH_4_GND: 'Hamad Ground | Overflow',
		OTHH_5_GND: 'Hamad Ground | Planner',
		OTBD_GND: 'Doha Ground',

		OTHH_DEL: 'Hamad Clearance Delivery',

		OTDF_N1_CTR: 'Doha Control | North Sector',
		OTDF_N2_CTR: 'Doha Control | North High Sector',
		OTDF_S_CTR: 'Doha Control | South Sector',

		DOH_R1_APP: 'Doha Radar | North Sector',
		DOH_R2_APP: 'Doha Radar | South Sector',
		DOH_A1_APP: 'Doha Approach | West Sector',
		DOH_A2_APP: 'Doha Approach | East Sector',
		DOH_F1_APP: 'Doha Director | East Sector',
		DOH_F2_APP: 'Doha Director | West Sector',
		DOH_F3_APP: 'Doha Final Monitor Control',
		DOH_MIL_APP: 'Doha Military Director',

		OBBI_TWR: 'Bahrain Tower',
		OBBS_TWR: 'Isa-Airbase Tower',
		OBKH_TWR: 'Sakhir Tower',
		OBBI_GND: 'Bahrain Ground',
		OBBI_DEL: 'Bahrain Delivery',
		OBBI_APP: 'Bahrain Approach',
		OBBI_DEP: 'Bahrain Approach | Departure/Director',
		OBBS_APP: 'Isa-Airbase Approach Radar',

		OBBB_1_CTR: 'Bahrain Radar | Bandbox',
		OBBB_CH_CTR: 'Bahrain Radar | Central High Sector',
		OBBB_CL_CTR: 'Bahrain Radar | Central Low Sector',
		OBBB_2_CTR: 'Bahrain Radar | North High Sector',
		OBBB_N_CTR: 'Bahrain Radar | North Low Sector'
	};

	onMount(() => {
		let disposed = false;
		let updating = false;

		async function updateControllers() {
			if (updating) return;

			updating = true;

			try {
				const response = await fetch(
					'https://data.vatsim.net/v3/vatsim-data.json'
				);

				if (!response.ok) {
					throw new Error('Failed to fetch VATSIM data');
				}

				const vatsimData = await response.json();

				if (!Array.isArray(vatsimData.controllers)) {
					throw new Error('Invalid VATSIM controller data');
				}

				const activeControllers: Controller[] =
					vatsimData.controllers
						.filter((controller: Controller) => {
							const callsign =
								controller.callsign.toUpperCase();

							return (
								controller.facility !== 0 &&
								(
									callsign.startsWith('OT') ||
									callsign.startsWith('OB') ||
									callsign.startsWith('DOH')
								)
							);
						})
						.sort((a: Controller, b: Controller) =>
							a.callsign.localeCompare(b.callsign)
						);

				if (!disposed) {
					controllers = activeControllers;
					controllersLoaded = true;
					controllersError = false;
				}
			} catch (error) {
				console.error(
					'Failed to load active VATSIM controllers:',
					error
				);

				if (!disposed) {
					controllersError = true;
				}
			} finally {
				updating = false;
			}
		}

		void updateControllers();

		const interval = setInterval(() => {
			void updateControllers();
		}, 60_000);

		return () => {
			disposed = true;
			clearInterval(interval);
		};
	});

	function getFacilityName(facility: number): string {
		const facilities: Record<number, string> = {
			0: 'Observer',
			1: 'Flight Service Station',
			2: 'Clearance Delivery',
			3: 'Ground',
			4: 'Tower',
			5: 'Approach',
			6: 'Enroute'
		};

		return facilities[facility] ?? 'ATC';
	}

	function getTimeOnline(logonTime: string): string {
		const elapsed = Math.max(
			0,
			Math.floor((Date.now() - new Date(logonTime).getTime()) / 1000)
		);

		const hours = Math.floor(elapsed / 3600);
		const minutes = Math.floor((elapsed % 3600) / 60);

		if (hours > 0) {
			return `${hours}h ${minutes}m`;
		}

		return `${minutes}m`;
	}
</script>

<svelte:head>
	<title>Khaleej vACC</title>
	<meta
		name="description"
		content="Explore the virtual skies of Bahrain and Qatar with Khaleej vACC on VATSIM. View upcoming events and active air traffic controllers."
	/>
</svelte:head>

<main class="flex flex-col font-ubuntu">
	<!-- Hero -->
	<section
		class="relative isolate min-h-dvh overflow-hidden bg-cover bg-center bg-no-repeat"
	>
		<enhanced:img
			src={bgImage}
			alt="Background Image"
			class="absolute inset-0 -z-20 h-full w-full object-cover object-center"
		/>

		<div class="absolute inset-0 -z-10 bg-black/50"></div>

		<div class="container mx-auto px-5">
			<div class="flex min-h-dvh flex-col justify-center">
				<h2 class="text-2xl md:text-4xl">
					Welcome to the
				</h2>

				<h1
					class="mt-1 text-5xl font-bold text-secondary md:text-7xl"
				>
					Khaleej vACC
				</h1>

				<p class="mt-2 max-w-lg">
					Explore the virtual skies of Bahrain and Qatar with
					Khaleej vACC on VATSIM. Experience realistic air traffic
					control and piloting with our community.
				</p>
			</div>
		</div>

		<div
			class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"
		></div>
	</section>

	<!-- Active Controllers -->
	<section class="bg-base-300 py-10">
		<div class="container mx-auto px-5">
			<div class="flex flex-col gap-6">
				<div
					class="divider divider-secondary text-4xl before:bg-opacity-50 after:bg-opacity-50"
				>
					Active Controllers
				</div>

				{#if !controllersLoaded}
					<p class="py-6 text-center text-base-content/60">
						{controllersError
							? 'Controller data is temporarily unavailable. Retrying shortly.'
							: 'Loading active controllers...'}
					</p>
				{:else if controllers.length === 0}
					<p class="py-6 text-center">
						There are currently no active controllers online.
					</p>
				{:else}
					<div
						class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
					>
						{#each controllers as controller (controller.callsign)}
							<div
								class="rounded-lg border border-base-content/10 bg-base-100 p-5 transition-colors hover:border-base-content/25"
							>
								<div
									class="flex items-start justify-between gap-3"
								>
									<div class="min-w-0">
										<h3
											class="break-words text-lg font-bold tracking-wide"
										>
											{controller.callsign}
										</h3>

										<p
											class="mt-0.5 text-sm text-base-content/60"
										>
											{stationNames[controller.callsign] ??
												getFacilityName(controller.facility)}
										</p>
									</div>

									<span class="shrink-0 text-xs text-base-content/60 tabular-nums">
										{getTimeOnline(controller.logon_time)} online
									</span>
								</div>

								<p
									class="mt-3 text-2xl font-semibold tabular-nums"
								>
									{controller.frequency}
									<span
										class="text-sm font-normal text-base-content/50"
									>
										MHz
									</span>
								</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Upcoming Events -->
	<section class="bg-base-300 py-10">
		<div class="container mx-auto px-5">
			<div class="flex flex-col gap-10">
				<div
					class="divider divider-secondary text-4xl before:bg-opacity-50 after:bg-opacity-50"
				>
					Upcoming Events
				</div>

				{#if data.events}
					<Events events={data.events} />
				{:else}
					<p class="text-center">
						There are currently no upcoming events.
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Our Partners -->
	<section class="bg-base-300 pb-10">
		<div class="container mx-auto px-5">
			<div class="flex flex-col gap-10">
				<div
					class="divider divider-secondary text-4xl before:bg-opacity-50 after:bg-opacity-50"
				>
					Our Partners
				</div>

				<div
					class="flex flex-wrap items-center justify-center gap-10"
				>
					<a
						href="https://vatsim.net/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="VATSIM"
						class="transition-opacity hover:opacity-50"
					>
						<enhanced:img
							src={vatsimLogo}
							alt="VATSIM"
							class="h-28 w-auto"
						/>
					</a>

					<enhanced:img
						src={hawkskullzLogo}
						alt="Hawkskullz"
						class="h-40 w-auto"
					/>

					<a
						href="https://www.gulfskiesvirtual.org/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Gulf Skies Virtual Airlines"
						class="transition-opacity hover:opacity-50"
					>
						<enhanced:img
							src={gulfSkiesLogo}
							alt="Gulf Skies Virtual Airlines"
							class="h-24 w-auto"
						/>
					</a>
				</div>
			</div>
		</div>
	</section>
</main>