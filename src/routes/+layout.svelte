<script lang="ts">
	import "../app.css";
	import "@fontsource/mali/200.css";
	import "@fontsource/mali/300.css";
	import "@fontsource/mali/400.css";
	import "@fontsource/mali/500.css";
	import "@fontsource/mali/600.css";
	import "@fontsource/mali/700.css";
	import { Toaster } from "svelte-sonner";
	
	let { children } = $props();
</script>

<Toaster></Toaster>
{@render children()}

<style>
	:global(body) {
		max-width: 100vw;
		min-height: 100dvh;
		min-height: 100vh;
		overflow: hidden;
	}
</style>
