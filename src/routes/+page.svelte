<script lang="ts">
	import ciphers from '$lib/ciphers';

	let input = '';
</script>

<textarea bind:value={input} />

<ul>
	{#each ciphers as Cipher}
		<li>
			<Cipher {input} />
		</li>
	{/each}
</ul>

<style lang="scss">
	textarea {
		width: 100%;
		margin: auto;
	}
</style>
