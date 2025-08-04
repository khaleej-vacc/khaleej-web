<script lang="ts">
	import type { PageProps } from './$types';

	import Events from '$lib/components/Events.svelte';

	import bgImage from '$lib/assets/images/bg.png';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-col">
	<section class="bg-cover bg-center bg-no-repeat h-screen" style="background-image: url({bgImage});">
		<div class="bg-black/50 h-full">
			<div class="container flex flex-col justify-center h-full">
				<h2 class="text-2xl md:text-4xl">👋 Welcome to</h2>
				<h1 class="font-bold text-secondary text-5xl md:text-7xl mt-1">Khaleej vACC</h1>
				<p class="mt-2 max-w-lg">
					Embark on an exhilarating journey through the virtual skies of Bahrain and Kuwait with Khaleej vACC. Join our vibrant community on
					VATSIM and experience the thrill of realistic air traffic control and piloting.
				</p>
			</div>
		</div>

		<div class="relative">
			<div class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-base-300"></div>
		</div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex flex-col gap-10">
			<div class="divider divider-secondary before:bg-opacity-50 after:bg-opacity-50 text-4xl">Upcoming Events</div>

			{#if data.events}
				<Events events={data.events} />
			{:else}
				<p class="text-center">There are currently no upcoming events.</p>
			{/if}
		</div>
	</section>

	<!-- <section class="bg-base-300 py-10">
		<div class="container flex flex-col">
			<h2 class="text-4xl">Upcoming Events</h2>
			<div class="divider"></div>
		</div>
	</section> -->

	<section class="bg-base-300 pb-10">
		<div class="container flex flex-col gap-10">
			<div class="divider divider-secondary before:bg-opacity-50 after:bg-opacity-50 text-4xl">Our Partners</div>

			<!-- Manual padding for now due to image aspect ratio mismatch -->
			<div class="flex flex-col md:flex-row justify-center items-center w-full">
				<a href="https://airlinkvirtual.com/" target="_blank" aria-label="Airlink Virtual" class="hover:opacity-50 transition-opacity">
					<enhanced:img src="../lib/assets/images/partners/airlink.png" alt="Partner Logo" class="w-auto h-28 md:mr-4" />
				</a>

				<a href="https://vatsim.net/" target="_blank" aria-label="VATSIM" class="hover:opacity-50 transition-opacity">
					<enhanced:img src="../lib/assets/images/partners/vatsim.png" alt="Partner Logo" class="w-auto h-28 mt-6 md:mt-0 md:ml-4" />
				</a>

				<!-- No external link provided -->
				<enhanced:img src="../lib/assets/images/partners/hawkskullz.png" alt="Partner Logo" class="w-auto h-40" />
			</div>
		</div>
	</section>
</main>
