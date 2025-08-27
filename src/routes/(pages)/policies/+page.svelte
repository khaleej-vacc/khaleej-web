<script lang="ts">
	import { HeartHandshake, BookText, ExternalLink } from 'lucide-svelte';

	import bgImage from '$lib/assets/images/bg.png?enhanced';
</script>

<!-- Will need to add some sort of dynamic data handling -->

<main class="flex flex-col">
	<section class="relative isolate min-h-[40dvh] bg-cover bg-center bg-no-repeat" style="background-image: url({bgImage});">
		<enhanced:img src={bgImage} alt="Background Image" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />

		<!-- Background Overlay -->
		<div class="absolute inset-0 -z-10 bg-black/50"></div>

		<div class="container mx-auto">
			<div class="flex min-h-[40dvh] flex-col items-center justify-center">
				<div class="flex items-center gap-2 text-2xl font-bold text-secondary md:text-4xl">
					<HeartHandshake size={36} /> Policies
				</div>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex min-h-[40vh] flex-col items-center justify-center gap-8">
			<div class="card relative w-full flex-row rounded-xl bg-opacity-80 p-6 shadow-xl">
				<!-- Decorative Overlay -->
				<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-secondary opacity-50 shadow-inner"></div>

				<!-- Content -->
				<div class="relative flex w-full flex-col justify-between gap-4 md:flex-row">
					<h2 class="card-title text-2xl font-bold"><BookText size={24} /> Khaleej GDPR Policy</h2>

					<!-- prettier-ignore -->
					<a
						target="_blank"
						href="https://cdn.khaleejvacc.net/Khaleej%20GDPR%20Policy.pdf"
						class="btn btn-secondary shadow-lg"><ExternalLink size={20} /> View</a
					>
				</div>
			</div>

			<div class="card relative w-full flex-row rounded-xl bg-opacity-80 p-6 shadow-xl">
				<!-- Decorative Overlay -->
				<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-secondary opacity-50 shadow-inner"></div>

				<!-- Content -->
				<div class="relative flex w-full flex-col justify-between gap-4 md:flex-row">
					<h2 class="card-title text-2xl font-bold"><BookText size={24} /> Khaleej vACC Code of Conduct</h2>

					<!-- prettier-ignore -->
					<a
                        target="_blank"
						href="https://cdn.khaleejvacc.net/Khaleej%20vACC%20Code%20of%20Conduct.pdf"
						class="btn btn-secondary shadow-lg"><ExternalLink size={20} /> View</a
					>
				</div>
			</div>

			<div class="card relative w-full flex-row rounded-xl bg-opacity-80 p-6 shadow-xl">
				<!-- Decorative Overlay -->
				<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-secondary opacity-50 shadow-inner"></div>

				<!-- Content -->
				<div class="relative flex w-full flex-col justify-between gap-4 md:flex-row">
					<h2 class="card-title text-2xl font-bold"><BookText size={24} /> Khaleej vACC ATC Policy</h2>

					<!-- prettier-ignore -->
					<a
                        target="_blank"
						href="https://cdn.khaleejvacc.net/Khaleej%20vACC%20ATC%20Policy.pdf"
						class="btn btn-secondary shadow-lg"><ExternalLink size={20} /> View</a
					>
				</div>
			</div>

			<div class="card relative w-full flex-row rounded-xl bg-opacity-80 p-6 shadow-xl">
				<!-- Decorative Overlay -->
				<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-secondary opacity-50 shadow-inner"></div>

				<!-- Content -->
				<div class="relative flex w-full flex-col justify-between gap-4 md:flex-row">
					<h2 class="card-title text-2xl font-bold"><BookText size={24} /> Controlling Software Installation Guide</h2>

					<!-- prettier-ignore -->
					<a
                        target="_blank"
						href="https://cdn.khaleejvacc.net/Controlling%20Software%20Installation%20Guide.pdf"
						class="btn btn-secondary shadow-lg"><ExternalLink size={20} /> View</a
					>
				</div>
			</div>
		</div>
	</section>
</main>
