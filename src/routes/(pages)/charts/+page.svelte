
<script lang="ts">
	import { Map, Search, Plane, ExternalLink } from 'lucide-svelte';
	import bgImage from '$lib/assets/images/bg.png?enhanced';

	let searchQuery = '';

	const firSections = [
		{
			name: 'Doha FIR',
			country: 'Qatar',
			airports: [
				{
					icao: 'OTHH',
					name: 'Hamad International Airport',
					country: 'Qatar',
					url: 'https://docs.khaleejvacc.net/Pilot-Briefings/Hamad_International_Airport/GeneralInformation/'
				},
				{
					icao: 'OTBD',
					name: 'Doha International Airport',
					country: 'Qatar',
					url: 'https://docs.khaleejvacc.net/Pilot-Briefings/Doha_International_Airport/GeneralInformation/'
				}
			]
		},
		{
			name: 'Bahrain FIR',
			country: 'Bahrain',
			airports: [
				{
					icao: 'OBBI',
					name: 'Bahrain International Airport',
					country: 'Bahrain',
					url: 'https://docs.khaleejvacc.net/Pilot-Briefings/Bahrain_International_Airport/GeneralInformation/'
				}
			]
		}
	];

	$: filteredSections = firSections.map((fir) => ({
		...fir,
		airports: fir.airports.filter((airport) => {
			const query = searchQuery.trim().toLowerCase();

			if (!query) return true;

			return [
				airport.icao,
				airport.name,
				airport.country,
				fir.name
			].some((value) => value.toLowerCase().includes(query));
		})
	}));
</script>

<svelte:head>
	<title>Airports & Charts | Khaleej vACC</title>
	<meta
		name="description"
		content="Airport information and briefing resources for Doha FIR and Bahrain FIR."
	/>
</svelte:head>

<main class="min-h-screen bg-base-300 text-base-content">
	<!-- Page header -->
	<section
		class="relative isolate min-h-[34vh] bg-cover bg-center bg-no-repeat"
	>
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
			<!-- Search -->
			<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 class="text-xl font-semibold">Airport directory</h2>
					<p class="mt-1 text-sm text-base-content/60">
						Select an airport to access its briefing documentation.
					</p>
				</div>

				<div
					class="flex w-full items-center gap-3 rounded-lg border border-base-content/15 bg-base-100 px-4 py-3 sm:max-w-sm"
				>
					<Search size={18} class="shrink-0 text-base-content/50" />

					<input
						bind:value={searchQuery}
						type="search"
						placeholder="Search airports or FIRs..."
						aria-label="Search airports or FIRs"
						class="w-full bg-transparent text-sm outline-none placeholder:text-base-content/40"
					/>

					{#if searchQuery}
						<button
							type="button"
							onclick={() => (searchQuery = '')}
							class="text-xs text-base-content/60 transition hover:text-base-content"
						>
							Clear
						</button>
					{/if}
				</div>
			</div>

			<!-- FIR sections -->
			<div class="space-y-12">
				{#each filteredSections as fir}
					<section>
						<div
							class="mb-5 flex items-center justify-between border-b border-base-content/10 pb-4"
						>
							<div>
								<p
									class="mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/50"
								>
									{fir.country}
								</p>

								<h2 class="text-2xl font-semibold">
									{fir.name}
								</h2>
							</div>

							<span class="text-sm text-base-content/50">
								{fir.airports.length}
								{fir.airports.length === 1 ? 'airport' : 'airports'}
							</span>
						</div>

						{#if fir.airports.length > 0}
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								{#each fir.airports as airport}
									<a
										href={airport.url}
										target="_blank"
										rel="noopener noreferrer"
										class="group flex min-h-32 items-start gap-4 rounded-lg border border-base-content/10 bg-base-100 p-5 transition-colors hover:border-base-content/25 hover:bg-base-200"
									>
										<div
											class="flex size-11 shrink-0 items-center justify-center rounded-md bg-base-300 text-base-content/70"
										>
											<Plane size={21} />
										</div>

										<div class="min-w-0 flex-1">
											<div
												class="flex items-center justify-between gap-3"
											>
												<h3
													class="text-lg font-semibold tracking-wide"
												>
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

											<p
												class="mt-3 text-xs text-base-content/50"
											>
												Airport information
											</p>
										</div>
									</a>
								{/each}
							</div>
						{:else}
							<p class="rounded-lg border border-base-content/10 px-5 py-6 text-sm text-base-content/55">
								No airports match your search in this FIR.
							</p>
						{/if}
					</section>
				{/each}
			</div>
		</div>
	</section>
</main>
