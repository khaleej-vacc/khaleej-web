<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Khaleej vACC</title>
	<meta name="description" content="Khaleej vACC is a virtual area control center for the Bahrain and Qatar region on the VATSIM network." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#d8c8a0" />

	<!-- OpenGraph -->
	<meta name="og:type" content="website" />
	<meta name="og:title" content="Khaleej vACC" />
	<meta name="og:description" content="Khaleej vACC is a virtual area control center for the Bahrain and Qatar region on the VATSIM network." />
	<meta name="og:image" content="https://khaleejvacc.net/favicon-96x96.png" />
	<meta name="og:url" content="https://khaleejvacc.net" />
</svelte:head>

<Header />
{@render children()}
<Toast />
<Footer />
