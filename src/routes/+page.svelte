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
	@use '$lib/sass/abstracts/mixins' as *;

	#input {
		display: flex;
		justify-content: center;
	}

	textarea {
		@include textbox;

		width: 100%;
		color: inherit;
	}
</style>
