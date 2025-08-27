<script lang="ts">
	import { ArrowDown } from 'lucide-svelte';

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
				<h1 class="text-center text-4xl md:text-6xl">Not sure where to start?</h1>
			</div>

			<div class="relative bottom-60">
				<ArrowDown size={20} class="m-auto h-10 w-10 animate-bounce text-secondary" />
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex min-h-[40vh] flex-col items-center gap-10">
			<div class="hero">
				<div class="hero-content flex-col-reverse gap-10 lg:flex-row">
					<div class="flex flex-col gap-4">
						<h2 class="text-2xl">Getting Started on VATSIM</h2>

						<p class="max-w-md">
							New to the VATSIM Network and recently started flying? Looking into controlling or simply just not sure where to start?
							Head over to the official VATSIM website that includes comprehensive documentation on how to get started by clicking the
							button below.
						</p>

						<!-- Disabled for now due to Discord integration -->
						<button class="btn btn-disabled">Get Started</button>
					</div>

					<enhanced:img src="../../../lib/assets/images/partners/vatsim.png" alt="VATSIM Image" class="h-auto w-96 shadow-2xl" />
				</div>
			</div>
			<div class="hero">
				<div class="hero-content flex-col-reverse gap-10 lg:flex-row-reverse">
					<div class="flex flex-col gap-4">
						<h2 class="text-2xl">Different VATSIM Region?</h2>

						<p class="max-w-md">
							Not a part of the Middle East and North Africa (MENA) region on VATSIM? Click the button below to request a region change.
							After that you can <a href="/join" class="btn-link text-secondary transition-opacity hover:opacity-50">click here</a> to get
							started on joining Khaleej vACC.
						</p>

						<!-- Disabled for now due to Discord integration -->
						<button class="btn btn-disabled">Get Started</button>
					</div>

					<enhanced:img src="../../../lib/assets/images/bg.png" alt="Region Image" class="h-auto w-96 rounded-lg shadow-2xl" />
				</div>
			</div>
		</div>
	</section>
</main>

<style lang="postcss">
</style>
