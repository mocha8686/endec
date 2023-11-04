<script lang="ts">
	import ciphers from '$lib/ciphers';

	let input = '';
</script>

<textarea id="input" bind:value={input} />

<ul class="ciphers">
	{#each ciphers as Cipher}
		<li class="cipher">
			<Cipher {input} />
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '$lib/sass/abstracts/colors';

	#input {
		display: flex;
		justify-content: center;
	}

	textarea {
		resize: vertical;

		width: 100%;
		min-height: 5.5em;

		color: inherit;

		background-color: colors.$background-secondary;
		border: 1px solid colors.$accent-primary;
		border-radius: 0.25em;
	}
</style>
