<script lang="ts">
	import type { PageProps } from './$types';

	import { cn } from '$lib/utils';
	import { UsersRound } from 'lucide-svelte';

	import bgImage from '$lib/assets/images/bg.png?enhanced';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-col">
	<section class="relative isolate min-h-[40dvh] bg-cover bg-center bg-no-repeat" style="background-image: url({bgImage});">
		<enhanced:img src={bgImage} alt="Background Image" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />

		<!-- Background Overlay -->
		<div class="absolute inset-0 -z-10 bg-black/50"></div>

		<div class="container mx-auto">
			<div class="flex min-h-[40dvh] flex-col items-center justify-center">
				<div class="flex items-center gap-2 text-2xl font-bold text-secondary md:text-4xl">
					<UsersRound size={36} /> Staff
				</div>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex min-h-[40vh] flex-col gap-10">
			{#if data.staff}
				{#each data.staff as staffObj}
					{#each Object.entries(staffObj) as [category, members]}
						<div class="divider divider-secondary text-3xl font-bold before:bg-opacity-50 after:bg-opacity-50">{category}</div>

						<!-- List -->
						<div class="col flex flex-row flex-wrap items-center justify-center gap-8">
							{#each members as member}
								<!-- Card -->
								<div class="card relative w-96 rounded-xl bg-opacity-80 p-6 shadow-xl">
									<!-- Decorative Overlay -->
									<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white to-secondary opacity-50 shadow-inner"></div>

									<div class="card-body relative items-center text-center">
										<h2 class="card-title text-2xl font-bold">{member.name}</h2>
										<span>• {member.short_title} •<br />{member.long_title}</span>
										<a
											href="mailto:{member.email}"
											class={cn('btn btn-secondary mt-4 w-full shadow-lg', { 'btn-disabled': !member.active })}>Contact</a
										>
										<code class="rounded bg-base-100 px-1 text-sm">{member.email}</code>
									</div>
								</div>
							{/each}
						</div>
					{/each}
				{/each}
			{/if}
		</div>
	</section>
</main>
