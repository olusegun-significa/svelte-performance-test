<script lang="ts" context="module">
	export const selectedGift = writable<{
		region: string;
		language: string;
	}>({
		region: '',
		language: 'en'
	});
</script>

<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { navigating } from '$app/stores';
	import { writable } from 'svelte/store';

	const region = 'eu';

	// notify Eleva on page change
	$: if (browser && $navigating && window?.ElevarDataLayer) {
		window.ElevarInvalidateContext?.();
		console.log('elevar:', window.ElevarInvalidateContext);
	}
</script>

<svelte:head>
	{#if !dev}
		<script>
			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != 'dataLayer' ? '&l=' + l : '';
				j.async = true;
				j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', 'GTM-PWWWTWCB');
		</script>

		{#if region === 'eu'}
			<script type="module">
				const settings = {};
				const config = (
					await import('/elevar/configs/d4316012bd4b5258220082d45fdbf8fa3819248b/config.js')
				).default;
				const scriptUrl = settings.proxyPath
					? `${settings.proxyPath}${config.script_src_custom_pages_proxied}`
					: config.script_src_custom_pages;

				if (scriptUrl) {
					const { handler } = await import(scriptUrl);
					await handler(config, settings);
				}
			</script>
		{:else if region === 'uk'}
			<script type="module">
				const settings = {};
				const config = (
					await import('/elevar/configs/bb19a374e62fbe8146a3c33f6cef0a239f73e896/config.js')
				).default;
				const scriptUrl = settings.proxyPath
					? `${settings.proxyPath}${config.script_src_custom_pages_proxied}`
					: config.script_src_custom_pages;

				if (scriptUrl) {
					const { handler } = await import(scriptUrl);
					await handler(config, settings);
				}
			</script>
		{:else}
			<!-- load us region as the default -->
			<script type="module">
				const settings = {};
				const config = (
					await import('/elevar/configs/daad0e3164dcabf6e25859f9328b2035625d89fe/config.js')
				).default;
				const scriptUrl = settings.proxyPath
					? `${settings.proxyPath}${config.script_src_custom_pages_proxied}`
					: config.script_src_custom_pages;

				if (scriptUrl) {
					const { handler } = await import(scriptUrl);
					await handler(config, settings);
				}
			</script>
		{/if}

		{#if browser}
			<script>
				window.ElevarDataLayer = window.ElevarDataLayer ?? [];
			</script>
		{/if}
	{/if}
</svelte:head>
