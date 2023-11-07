<script lang="ts">
	import ciphers from '$lib/ciphers';
	import { input } from '$lib/input';
</script>

<form class="input-container">
	<textarea class="textbox" bind:value={$input} />
</form>

<ul class="ciphers">
	{#each ciphers as Cipher}
		<li class="cipher">
			<Cipher />
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '$lib/sass/abstracts/mixins' as *;

	.textbox {
		@include textbox(false);

		width: 100%;
	}
</style>
