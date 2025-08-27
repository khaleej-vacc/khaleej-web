<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';

	import { Rss, CircleCheck, CircleX } from 'lucide-svelte';

	import bgImage from '$lib/assets/images/bg.png?enhanced';

	let { data } = $props();

	const { form, errors, constraints, message, delayed, enhance } = superForm(data.form);
</script>

<main class="flex flex-col">
	<section class="relative isolate min-h-[40dvh] bg-cover bg-center bg-no-repeat" style="background-image: url({bgImage});">
		<enhanced:img src={bgImage} alt="Background Image" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />

		<!-- Background Overlay -->
		<div class="absolute inset-0 -z-10 bg-black/50"></div>

		<div class="container mx-auto">
			<div class="flex min-h-[40dvh] flex-col items-center justify-center">
				<div class="flex items-center gap-2 text-2xl font-bold text-secondary md:text-4xl">
					<Rss size={36} /> ATC Feedback
				</div>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex flex-col items-center">
			<form method="POST" class="card card-body w-full" use:enhance>
				<div class="form-control">
					<label for="pilotName" class="label">
						<span class="label-text">Your Name</span>
					</label>

					<input
						type="text"
						name="pilotName"
						placeholder="Chesley Sullenberger"
						class={cn('input input-bordered', { 'input-error': $errors.pilotName })}
						bind:value={$form.pilotName}
						{...$constraints.pilotName}
					/>

					<div class="label">
						<span class="label-text-alt italic"
							>NOTE: The pilot's name will remain anonymous and is collected solely for staff to verify the occurrence.</span
						>
					</div>

					{#if $errors.pilotName}
						<div class="label">
							<span class="label-text-alt text-error">{$errors.pilotName}</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="pilotCallsign" class="label">
						<span class="label-text">Your Callsign</span>
					</label>

					<input
						type="text"
						name="pilotCallsign"
						placeholder="GFA211"
						class={cn('input input-bordered', { 'input-error': $errors.pilotCallsign })}
						bind:value={$form.pilotCallsign}
						{...$constraints.pilotCallsign}
					/>

					{#if $errors.pilotCallsign}
						<div class="label">
							<span class="label-text-alt text-error">{$errors.pilotCallsign}</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="interactionDate" class="label">
						<span class="label-text">Date of Interaction</span>
					</label>

					<input
						type="date"
						name="interactionDate"
						class={cn('input input-bordered', { 'input-error': $errors.interactionDate })}
						bind:value={$form.interactionDate}
						{...$constraints.interactionDate}
					/>

					{#if $errors.interactionDate}
						<div class="label">
							<span class="label-text-alt text-error">{$errors.interactionDate}</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="atcName" class="label">
						<span class="label-text">Controller Name</span>
					</label>

					<input
						type="text"
						name="atcName"
						placeholder="John Doe"
						class={cn('input input-bordered', { 'input-error': $errors.atcName })}
						bind:value={$form.atcName}
						{...$constraints.atcName}
					/>

					{#if $errors.atcName}
						<div class="label">
							<span class="label-text-alt text-error">{$errors.atcName}</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="atcCallsign" class="label">
						<span class="label-text">Controller Callsign</span>
					</label>

					<input
						type="text"
						name="atcCallsign"
						placeholder="OBBI_TWR"
						class={cn('input input-bordered', { 'input-error': $errors.atcCallsign })}
						bind:value={$form.atcCallsign}
						{...$constraints.atcCallsign}
					/>

					{#if $errors.atcCallsign}
						<div class="label">
							<span class="label-text-alt text-error">{$errors.atcCallsign}</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="rating" class="label">
						<span class="label-text">Rating</span>
					</label>

					<input
						type="range"
						name="rating"
						min="0"
						max="100"
						step="25"
						class="range range-secondary"
						bind:value={$form.rating}
						{...$constraints.rating}
					/>

					<div class="mt-2 flex w-full justify-between px-2 text-xs">
						<span>Poor</span>
						<span>Below Average</span>
						<span>Average</span>
						<span>Good</span>
						<span>Excellent</span>
					</div>

					{#if $errors.rating}
						<div class="label">
							<span class="label-text-alt text-error">{$errors.rating}</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="feedback" class="label">
						<span class="label-text">Feedback</span>
					</label>

					<textarea
						name="feedback"
						placeholder="I was flying today and noticed that the controller was..."
						class={cn('textarea textarea-bordered h-24', { 'input-error': $errors.feedback })}
						bind:value={$form.feedback}
						{...$constraints.feedback}
					></textarea>

					{#if $errors.feedback}
						<div class="label">
							<span class="label-text-alt text-error">{$errors.feedback}</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-6">
					<button type="submit" class={cn('btn btn-secondary', { 'btn-disabled': $delayed })}>
						{#if $delayed}
							<span class="loading loading-spinner"></span>
						{:else}
							Submit
						{/if}
					</button>
				</div>
			</form>

			{#if $message}
				{#if $message.status == 'success'}
					<div role="alert" class="alert alert-success max-w-md">
						<CircleCheck size={24} /><span>{$message.text}</span>
					</div>
				{:else if $message.status == 'error'}
					<div role="alert" class="alert alert-error max-w-md">
						<CircleX size={24} /><span>{$message.text}</span>
					</div>
				{/if}
			{/if}
		</div>
	</section>
</main>

<style lang="postcss">
	.alert {
		grid-auto-flow: column;
		grid-template-columns: auto minmax(auto, 1fr);
		justify-items: start;
		text-align: start;
	}
</style>
