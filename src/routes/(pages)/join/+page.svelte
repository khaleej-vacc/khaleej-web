
<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<script lang="ts">
	import {
		ArrowDown,
		ArrowRight,
		BookOpen,
		GraduationCap,
		Ticket,
		Users
	} from 'lucide-svelte';

	import bgImage from '$lib/assets/images/join.png?enhanced';
</script>

<main class="flex flex-col" style="font-family: 'Ubuntu', sans-serif;">
	<!-- Hero -->
	<section class="relative isolate min-h-dvh overflow-hidden bg-cover bg-center bg-no-repeat">
		<enhanced:img
			src={bgImage}
			alt="Khaleej vACC"
			class="absolute inset-0 -z-20 h-full w-full object-cover object-center"
		/>

		<div class="absolute inset-0 -z-10 bg-black/60"></div>

		<div class="container mx-auto px-4">
			<div class="flex min-h-dvh flex-col items-center justify-center gap-6 -translate-y-20">
				<h1 class="max-w-4xl text-center text-4xl font-bold md:text-6xl">
					Start Your Journey
				</h1>

				<p class="max-w-2xl text-center text-lg text-white/80">
					Join our community of virtual air traffic controllers and help keep the skies
					of Bahrain and Qatar moving.
				</p>

				<a href="#joining-options" class="btn btn-secondary mt-4">
					Explore Your Options
					<ArrowDown size={18} />
				</a>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<!-- Joining Options -->
	<section id="joining-options" class="bg-base-300 px-4 py-20">
		<div class="container mx-auto">
			<div class="mx-auto mb-12 max-w-2xl text-center">
				<h2 class="text-3xl font-bold md:text-4xl">Join Khaleej vACC</h2>

				<p class="mt-4 opacity-70">
					Whether you're looking to make Khaleej your home division or visit from
					another division, there's a path for you.
				</p>
			</div>

			<div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
				<!-- Resident Controllers -->
				<div class="card border border-base-content/10 bg-base-100 shadow-xl">
					<div class="card-body gap-6 p-6 md:p-8">
						<div
							class="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary"
						>
							<Users size={28} />
						</div>

						<div>
							<h3 class="text-2xl font-bold">Resident Controllers</h3>

							<p class="mt-2 opacity-70">
								Make Khaleej vACC your home and develop your controlling skills
								within our sub-division.
							</p>
						</div>

						<div class="divider my-0"></div>

						<div class="flex gap-4">
							<Ticket size={22} class="mt-1 shrink-0 text-secondary" />

							<div>
								<h4 class="font-semibold">1. Request a transfer</h4>

								<p class="mt-1 text-sm opacity-70">
									Open a ticket with VATMENA HQ requesting a transfer to Khaleej vACC.
								</p>

								<a
									href="https://hq.vatsim.me/support"
									target="_blank"
									rel="noopener noreferrer"
									class="link link-secondary mt-2 inline-flex items-center gap-1"
								>
									Open VATMENA HQ <ArrowRight size={14} />
								</a>
							</div>
						</div>

						<div class="flex gap-4">
							<GraduationCap size={22} class="mt-1 shrink-0 text-secondary" />

							<div>
								<h4 class="font-semibold">2. Enrol in training</h4>

								<p class="mt-1 text-sm opacity-70">
									Enrol in a training course to develop your knowledge and
									progress as a controller.
								</p>

								<!-- Replace with your training course URL -->
								<a
									href="https://hq.vatsim.me/training/my-training"
									class="link link-secondary mt-2 inline-flex items-center gap-1"
								>
									View training courses <ArrowRight size={14} />
								</a>
							</div>
						</div>

						<div class="flex gap-4">
							<BookOpen size={22} class="mt-1 shrink-0 text-secondary" />

							<div>
								<h4 class="font-semibold">3. Review our documentation</h4>

								<p class="mt-1 text-sm opacity-70">
									Familiarise yourself with our standard operating procedures
									and local controlling documentation.
								</p>

								<a
									href="https://docs.khaleejvacc.net/"
									target="_blank"
									rel="noopener noreferrer"
									class="link link-secondary mt-2 inline-flex items-center gap-1"
								>
									Read our documentation <ArrowRight size={14} />
								</a>
							</div>
						</div>

						<div class="card-actions mt-auto pt-4">
							<a
								href="https://hq.vatsim.me/"
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-secondary w-full"
							>
								Request a Transfer <ArrowRight size={18} />
							</a>
						</div>
					</div>
				</div>

				<!-- Visiting Controllers -->
				<div class="card border border-base-content/10 bg-base-100 shadow-xl">
					<div class="card-body gap-6 p-6 md:p-8">
						<div
							class="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary"
						>
							<Users size={28} />
						</div>

						<div>
							<h3 class="text-2xl font-bold">Visiting Controllers</h3>

							<p class="mt-2 opacity-70">
								Already a controller in another VATSIM division? Join Khaleej vACC
								as a visitor!
							</p>
						</div>

						<div class="divider my-0"></div>

						<div class="flex gap-4">
							<Ticket size={22} class="mt-1 shrink-0 text-secondary" />

							<div>
								<h4 class="font-semibold">1. VATMENA HQ</h4>

								<p class="mt-1 text-sm opacity-70">
									Log in to the VATMENA HQ using VATSIM Connect.
								</p>

								<a
									href="https://hq.vatsim.me/"
									target="_blank"
									rel="noopener noreferrer"
									class="link link-secondary mt-2 inline-flex items-center gap-1"
								>
									Open VATMENA HQ <ArrowRight size={14} />
								</a>
							</div>
						</div>

						<div class="flex gap-4">
							<GraduationCap size={22} class="mt-1 shrink-0 text-secondary" />

							<div>
								<h4 class="font-semibold">2. Submit your application</h4>

								<p class="mt-1 text-sm opacity-70">
									Navigate to <strong>Sub Division → ATC</strong>, select
									<strong> Apply for Visiting</strong>, and select the
									<strong> Khaleej vACC</strong>.
								</p>

								<a
									href="https://hq.vatsim.me/"
									target="_blank"
									rel="noopener noreferrer"
									class="link link-secondary mt-2 inline-flex items-center gap-1"
								>
									Apply through HQ <ArrowRight size={14} />
								</a>
							</div>
						</div>

						<div class="flex gap-4">
							<BookOpen size={22} class="mt-1 shrink-0 text-secondary" />

							<div>
								<h4 class="font-semibold">3. Join our Discord</h4>

								<p class="mt-1 text-sm opacity-70">
									Our Discord is the best way to stay updated with the vACC.
								</p>

								<a
									href="https://community.vatsim.net/"
									target="_blank"
									rel="noopener noreferrer"
									class="link link-secondary mt-2 inline-flex items-center gap-1"
								>
									Join our Discord <ArrowRight size={14} />
								</a>
							</div>
						</div>

						<div class="rounded-xl bg-base-200 p-4">
							<h4 class="font-semibold">Requirements</h4>

							<ul class="mt-2 list-inside list-disc space-y-2 text-sm opacity-80">
								<li>
									Outside of VATMENA: Hold an S3 rating or above
								</li>
								<li>
									Within VATMENA: Hold an S2 rating or above
								</li>
								<li>
									Hold a consolidated rating (at least 50 hours on your current rating)
								</li>
							</ul>
						</div>

						<div class="card-actions mt-auto pt-4">
							<a
								href="https://hq.vatsim.me/"
								target="_blank"
								rel="noopener noreferrer"
								class="btn btn-secondary w-full"
							>
								Apply to Visit <ArrowRight size={18} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>