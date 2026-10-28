
<script lang="ts">
	import type { PageData } from './$types';
	import { FileDown, Download, Clock3 } from 'lucide-svelte';
	import bgImage from '$lib/assets/images/airports.png?enhanced';

	export let data: PageData;
</script>

<svelte:head>
	<title>Khaleej vACC</title>
	<meta
		name="description"
		content="Download the latest controller sector files for Doha FIR (OTDF) and Bahrain FIR (OBBB), with current AIRAC and release information."
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

		<div class="container mx-auto">
			<div class="flex min-h-[40dvh] flex-col items-center justify-center">
				<div class="flex items-center gap-2 text-2xl font-bold text-secondary md:text-4xl">
					<FileDown size={36} /> Sector Files
				</div>
			</div>
		</div>

		<div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10 md:py-14">
		<div class="container mx-auto px-5">
			<div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
				{#each data.firs as fir (fir.code)}
					<section class="overflow-hidden rounded-xl border border-base-content/10 bg-base-100 shadow-sm">
						<div class="flex items-center gap-4 border-b border-base-content/10 bg-base-200/60 p-5 md:p-6">
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
								{#if fir.code === 'OTDF'}
									<img
										src="https://flagcdn.com/qa.svg"
										alt="Qatar flag"
										class="h-7 w-10 object-contain"
									/>
								{:else if fir.code === 'OBBB'}
									<img
										src="https://flagcdn.com/bh.svg"
										alt="Bahrain flag"
										class="h-7 w-10 object-contain"
									/>
								{/if}
							</div>
							<div class="min-w-0 flex-1">
								<h3 class="mt-0.5 text-2xl font-semibold">{fir.name}</h3>
							</div>
						</div>

						<div class="p-5 md:p-6">
							<div class="rounded-lg border border-base-content/10 bg-base-200/40 p-4">
								<div class="flex items-start justify-between gap-4">
									<div>
										<p class="text-sm text-base-content/60">Current AIRAC</p>
										<p class="mt-1 text-2xl font-bold tabular-nums">
											{fir.airac ?? 'Not available'}
										</p>
									</div>
								</div>

								<div class="mt-4 border-t border-base-content/10 pt-4">
									<p class="text-xs font-medium uppercase tracking-wide text-base-content/45">
										Version
									</p>
									<p class="mt-1 text-sm font-medium tabular-nums">
										{fir.version ?? 'Unavailable'}
									</p>
								</div>
							</div>

							<div class="mt-5 flex items-start gap-3">
								<div class="mt-0.5 text-base-content/45">
									<Clock3 size={18} />
								</div>
								<div class="min-w-0 flex-1">
									<p class="text-sm text-base-content/60">Last released:</p>
									<p class="mt-1 break-words text-sm font-medium tabular-nums">
										{fir.released
											? fir.released.replace(/:\d{2}$/, '')
											: 'Currently unable to retrieve release time'}
									</p>
								</div>
							</div>

							{#if !fir.available}
								<p class="mt-4 rounded-md bg-warning/10 px-3 py-2 text-sm text-base-content/70">
									AeroNav's release details could not be loaded. Use the link below to check the latest package directly.
								</p>
							{/if}

							<a
								href={fir.url}
								target="_blank"
								rel="noopener noreferrer"
								class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-center font-semibold text-primary-content transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							>
								<Download size={18} />
								GNG Release
							</a>
						</div>
					</section>
				{/each}
			</div>
		</div>
	</section>
</main>
