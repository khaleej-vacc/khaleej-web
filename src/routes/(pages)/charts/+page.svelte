<script lang="ts">
	import { Map } from 'lucide-svelte';

	import bgImage from '$lib/assets/images/bg.png?enhanced';
</script>

<main class="flex flex-col">
	<section class="relative isolate min-h-[40dvh] bg-cover bg-center bg-no-repeat" style="background-image: url({bgImage});">
		<enhanced:img src={bgImage} alt="Background Image" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />

		<!-- Background Overlay -->
		<div class="absolute inset-0 -z-10 bg-black/50"></div>

		<div class="container mx-auto">
			<div class="flex min-h-[40dvh] flex-col items-center justify-center">
				<div class="flex items-center gap-2 text-2xl font-bold text-secondary md:text-4xl">
					<Map size={36} /> Airports & Charts
				</div>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex min-h-[40vh] flex-col items-center justify-center">There are currently no available charts.</div>
	</section>
</main>
