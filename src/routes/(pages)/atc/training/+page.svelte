<script lang="ts">
	import { Hammer } from 'lucide-svelte';

	import bgImage from '$lib/assets/images/bg.png?enhanced';
</script>

<main class="flex flex-col">
	<section class="relative isolate min-h-dvh overflow-hidden bg-cover bg-center bg-no-repeat">
		<!-- Backround Image -->
		<enhanced:img src={bgImage} alt="Background Image" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />

		<!-- Background Overlay -->
		<div class="absolute inset-0 -z-10 bg-black/50"></div>

		<div class="container mx-auto">
			<div class="flex min-h-dvh flex-col items-center justify-center">
				<div class="flex flex-col items-center gap-4 text-2xl font-bold text-secondary md:text-4xl">
					<Hammer size={60} /> Page Under Construction
				</div>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>
</main>
