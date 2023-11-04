<script lang="ts">
	import '$lib/sass/main.scss';
</script>

<header>
	<h1>endec</h1>
</header>

<main>
	<slot />
</main>

<style lang="scss">
	@use '$lib/sass/abstracts/colors';
	@use '$lib/sass/abstracts/variables' as *;

	@use 'include-media' as * with (
		$breakpoints: $breakpoints,
	);

	header {
		margin-block-end: 1em;
		background-color: colors.$header-primary;
		padding: 0.5em;
	}

	main {
		margin-inline: clamp(2em, 25svw, 7.5em);

		@include media("<small") {
			margin-inline: clamp(1em, 5svw, 2em);
		}
	}
</style>
