<script lang="ts">
	import '$lib/sass/main.scss';

	import Icon from '$lib/assets/Icon.svelte';
</script>

<header>
	<Icon />
	<h1>endec</h1>
</header>

<main>
	<slot />
</main>

<style lang="scss">
	@use '$lib/sass/abstracts/colors';
	@use '$lib/sass/abstracts/variables' as *;
	@use 'include-media' as * with (
		$breakpoints: $breakpoints
	);

	header {
		display: flex;
		gap: 0.5rem;
		align-items: center;

		margin-block-end: 1em;
		padding: 0.5em;

		background-color: colors.$header-primary;
	}

	h1 {
		margin: 0;
	}

	main {
		@include media('<small') {
			margin-inline: clamp(1em, 5svw, 2em);
		}

		margin-inline: clamp(2em, 25svw, 7.5em);
	}
</style>
