<script lang="ts">
	import type { PageProps } from './$types';

	import { UserRoundSearch, Check, X } from 'lucide-svelte';

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
					<UserRoundSearch size={36} /> ATC Roster
				</div>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex min-h-[40vh] flex-col items-center">
			<div role="tablist" class="tabs tabs-bordered w-full">
				<input type="radio" name="atc_roster_tabs" role="tab" class="tab" aria-label="Residents" checked />
				<div role="tabpanel" class="tab-content overflow-x-auto p-5">
					{#if data.residents}
						<table class="table">
							<thead>
								<tr>
									<th class="w-0">CID</th>
									<th class="w-1/5">Name</th>
									<th class="w-0">Rating</th>
									<th class="w-1/5">Title</th>
									<th>DEL</th>
									<th>GND</th>
									<th>TWR</th>
									<th>APP</th>
									<th>CTR</th>
								</tr>
							</thead>

							<tbody>
								{#each data.residents as resident}
									<tr>
										<td>{resident.cid}</td>
										<td class="whitespace-nowrap">{resident.name}</td>

										<td class="flex items-center justify-center">
											<span class="badge badge-neutral text-xs">
												{resident.rating}
											</span>
										</td>

										<td class="whitespace-nowrap">{resident.title}</td>

										<td>
											{#if resident.positions.DEL}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if resident.positions.GND}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if resident.positions.TWR}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if resident.positions.APP}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if resident.positions.CTR}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{:else}
						<p class="text-center">No residents found.</p>
					{/if}
				</div>

				<input type="radio" name="atc_roster_tabs" role="tab" class="tab" aria-label="Visitors" />
				<div role="tabpanel" class="tab-content overflow-x-auto p-5">
					{#if data.visitors}
						<table class="table">
							<thead>
								<tr>
									<th class="w-0">CID</th>
									<th class="w-1/5">Name</th>
									<th class="w-0">Rating</th>
									<th class="w-1/5">Title</th>
									<th>DEL</th>
									<th>GND</th>
									<th>TWR</th>
									<th>APP</th>
									<th>CTR</th>
								</tr>
							</thead>

							<tbody>
								{#each data.visitors as visitor}
									<tr>
										<td>{visitor.cid}</td>
										<td class="whitespace-nowrap">{visitor.name}</td>

										<td class="flex items-center justify-center">
											<span class="badge badge-neutral text-xs">
												{visitor.rating}
											</span>
										</td>

										<td class="whitespace-nowrap">{visitor.title}</td>

										<td>
											{#if visitor.positions.DEL}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if visitor.positions.GND}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if visitor.positions.TWR}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if visitor.positions.APP}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>

										<td>
											{#if visitor.positions.CTR}
												<Check class="text-success" />
											{:else}
												<X class="text-error" />
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{:else}
						<p class="text-center">No visitors found.</p>
					{/if}
				</div>
			</div>
		</div>
	</section>
</main>
