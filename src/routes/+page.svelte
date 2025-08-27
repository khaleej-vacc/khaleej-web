<script lang="ts">
	import type { PageProps } from './$types';

	import Events from '$lib/components/Events.svelte';

	import bgImage from '$lib/assets/images/bg.png?enhanced';
	import airlinkLogo from '$lib/assets/images/partners/airlink.png?enhanced';
	import vatsimLogo from '$lib/assets/images/partners/vatsim.png?enhanced';
	import hawkskullzLogo from '$lib/assets/images/partners/hawkskullz.png?enhanced';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-col">
	<section class="relative isolate min-h-dvh overflow-hidden bg-cover bg-center bg-no-repeat">
		<!-- Backround Image -->
		<enhanced:img src={bgImage} alt="Background Image" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />

		<!-- Background Overlay -->
		<div class="absolute inset-0 -z-10 bg-black/50"></div>

		<div class="container mx-auto">
			<div class="flex min-h-dvh flex-col justify-center">
				<h2 class="text-2xl md:text-4xl">👋 Welcome to</h2>
				<h1 class="mt-1 text-5xl font-bold text-secondary md:text-7xl">Khaleej vACC</h1>
				<p class="mt-2 max-w-lg">
					Embark on an exhilarating journey through the virtual skies of Bahrain and Kuwait with Khaleej vACC. Join our vibrant community on
					VATSIM and experience the thrill of realistic air traffic control and piloting.
				</p>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container mx-auto">
			<div class="flex flex-col gap-10">
				<div class="divider divider-secondary text-4xl before:bg-opacity-50 after:bg-opacity-50">Upcoming Events</div>

				{#if data.events}
					<Events events={data.events} />
				{:else}
					<p class="text-center">There are currently no upcoming events.</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- <section class="bg-base-300 py-10">
		<div class="container flex flex-col">
			<h2 class="text-4xl">Upcoming Events</h2>
			<div class="divider"></div>
		</div>
	</section> -->

	<section class="bg-base-300 pb-10">
		<div class="container mx-auto">
			<div class="flex flex-col gap-10">
				<div class="divider divider-secondary text-4xl before:bg-opacity-50 after:bg-opacity-50">Our Partners</div>

				<!-- Manual padding for now due to image aspect ratio mismatch -->
				<div class="flex w-full flex-col items-center justify-center md:flex-row">
					<a href="https://airlinkvirtual.com/" target="_blank" aria-label="Airlink Virtual" class="transition-opacity hover:opacity-50">
						<enhanced:img src={airlinkLogo} alt="Partner Logo" class="h-28 w-auto md:mr-4" />
					</a>

					<a href="https://vatsim.net/" target="_blank" aria-label="VATSIM" class="transition-opacity hover:opacity-50">
						<enhanced:img src={vatsimLogo} alt="Partner Logo" class="mt-6 h-28 w-auto md:ml-4 md:mt-0" />
					</a>

					<!-- No external link provided -->
					<enhanced:img src={hawkskullzLogo} alt="Partner Logo" class="h-40 w-auto" />
				</div>
			</div>
		</div>
	</section>
</main>
