<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';

	import { Mails, CircleCheck, CircleX } from 'lucide-svelte';

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
					<Mails size={36} /> Contact
				</div>
			</div>
		</div>

		<!-- Bottom Gradient -->
		<div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-300"></div>
	</section>

	<section class="bg-base-300 py-10">
		<div class="container flex min-h-[40vh] flex-col items-center">
			<form method="POST" class="card card-body w-full" use:enhance>
				<div class="form-control">
					<label for="name" class="label">
						<span class="label-text">Your Name</span>
					</label>

					<input
						type="text"
						name="name"
						placeholder="Chesley Sullenberger"
						class={cn('input input-bordered', { 'input-error': $errors.name })}
						bind:value={$form.name}
						{...$constraints.name}
					/>

					{#if $errors.name}
						<div class="label">
							<span class="label-text-alt text-error">
								{$errors.name}
							</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="vatsimCid" class="label">
						<span class="label-text">Your VATSIM CID</span>
					</label>

					<input
						type="number"
						name="vatsimCid"
						placeholder="1514902"
						class={cn('input input-bordered', { 'input-error': $errors.vatsimCid })}
						bind:value={$form.vatsimCid}
						{...$constraints.vatsimCid}
					/>

					{#if $errors.vatsimCid}
						<div class="label">
							<span class="label-text-alt text-error">
								{$errors.vatsimCid}
							</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="email" class="label">
						<span class="label-text">Your Email</span>
					</label>

					<input
						type="email"
						name="email"
						placeholder="example@mail.com"
						class={cn('input input-bordered', { 'input-error': $errors.email })}
						bind:value={$form.email}
						{...$constraints.email}
					/>

					{#if $errors.email}
						<div class="label">
							<span class="label-text-alt text-error">
								{$errors.email}
							</span>
						</div>
					{/if}
				</div>

				<div class="form-control mt-4">
					<label for="message" class="label">
						<span class="label-text">Message</span>
					</label>

					<textarea
						name="message"
						placeholder="I would like to contact you regarding..."
						class={cn('textarea textarea-bordered h-24', { 'input-error': $errors.message })}
						bind:value={$form.message}
						{...$constraints.message}
					></textarea>

					{#if $errors.message}
						<div class="label">
							<span class="label-text-alt text-error">
								{$errors.message}
							</span>
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
