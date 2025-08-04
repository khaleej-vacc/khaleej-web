<script lang="ts">
	import type { PageProps } from './$types';

	import { CalendarHeart } from 'lucide-svelte';

	import Events from '$lib/components/Events.svelte';

	import bgImage from '$lib/assets/images/bg.png';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-col">
	<section class="bg-cover bg-center bg-no-repeat h-[40vh]" style="background-image: url({bgImage});">
		<div class="bg-black/50 h-full">
			<div class="container flex flex-col justify-center items-center h-full">
				<div class="flex items-center gap-2 text-secondary font-bold text-2xl md:text-4xl">
					<CalendarHeart size={36} /> Events
				</div>
			</div>
		</div>

		<div class="relative">
			<div class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-base-300"></div>
		</div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex flex-col justify-center items-center min-h-[40vh]">
			{#if data.events}
				<Events events={data.events} />
			{:else}
				There are currently no upcoming events.
			{/if}
		</div>
	</section>
</main>
