<script lang="ts">
	import type { PageProps } from './$types';

	import { cn } from '$lib/utils';
	import { UsersRound } from 'lucide-svelte';

	import bgImage from '$lib/assets/images/bg.png';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-col">
	<section class="bg-cover bg-center bg-no-repeat h-[40vh]" style="background-image: url({bgImage});">
		<div class="bg-black/50 h-full">
			<div class="container flex flex-col justify-center items-center h-full">
				<div class="flex items-center gap-2 text-secondary font-bold text-2xl md:text-4xl">
					<UsersRound size={36} /> Staff
				</div>
			</div>
		</div>

		<div class="relative">
			<div class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-base-300"></div>
		</div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex flex-col gap-10 min-h-[40vh]">
			{#if data.staff}
				{#each data.staff as staffObj}
					{#each Object.entries(staffObj) as [category, members]}
						<div class="divider divider-secondary before:bg-opacity-50 after:bg-opacity-50 text-3xl font-bold">{category}</div>

						<!-- List -->
						<div class="flex flex-row flex-wrap col justify-center items-center gap-8">
							{#each members as member}
								<!-- Card -->
								<div class="relative card bg-opacity-80 w-96 rounded-xl shadow-xl p-6">
									<!-- Decorative Overlay -->
									<div class="absolute inset-0 bg-gradient-to-br from-white to-secondary shadow-inner opacity-50 rounded-xl"></div>

									<div class="relative card-body items-center text-center">
										<h2 class="card-title text-2xl font-bold">{member.name}</h2>
										<span>• {member.short_title} •<br />{member.long_title}</span>
										<a
											href="mailto:{member.email}"
											class={cn('btn btn-secondary w-full shadow-lg mt-4', { 'btn-disabled': !member.active })}>Contact</a
										>
										<code class="bg-base-100 rounded text-sm px-1">{member.email}</code>
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
