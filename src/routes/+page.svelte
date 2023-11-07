<script lang="ts">
	import ciphers from '$lib/ciphers';
import { input } from '$lib/input';
</script>

<form class="input-container">
	<textarea class="textbox" bind:value={$input} />
	<button type="button" class="textbox-button top-right">Copy</button>
	<button type="button" class="textbox-button bottom-right">Pin</button>
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

	.input-container {
		@include textbox-grid(4em);
	}
</style>
