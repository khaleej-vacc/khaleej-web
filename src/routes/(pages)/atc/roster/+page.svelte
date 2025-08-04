<script lang="ts">
	import type { PageProps } from './$types';

	import { UserRoundSearch, Check, X } from 'lucide-svelte';

	import bgImage from '$lib/assets/images/bg.png';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-col">
	<section class="bg-cover bg-center bg-no-repeat h-[40vh]" style="background-image: url({bgImage});">
		<div class="bg-black/50 h-full">
			<div class="container flex flex-col justify-center items-center h-full">
				<div class="flex items-center gap-2 text-secondary font-bold text-2xl md:text-4xl">
					<UserRoundSearch size={36} /> ATC Roster
				</div>
			</div>
		</div>

		<div class="relative">
			<div class="absolute bottom-0 w-full h-20 bg-gradient-to-t from-base-300"></div>
		</div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex flex-col items-center min-h-[40vh]">
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

										<td class="flex justify-center items-center">
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

										<td class="flex justify-center items-center">
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
