<script lang="ts">
	export let name: string;

	export let encoded: string | undefined | null = null;
	export let decoded: string | undefined | null = null;
</script>

<h2 class="cipher-name ciphers-item">{name}</h2>

{#if encoded !== null}
	<div
		class="output-container encoded ciphers-item"
		class:solo={decoded === null}
		class:disabled={encoded === undefined}
	>
		<output class="encoded">{encoded !== undefined ? encoded : ''}</output>
		<form class="options decoded">
			<slot class="options encoded" name="encoder-options" />
		</form>
	</div>
{/if}

{#if decoded !== null}
	<div
		class="output-container decoded ciphers-item"
		class:solo={encoded === null}
		class:disabled={decoded === undefined}
	>
		<output class="decoded">{decoded !== undefined ? decoded : ''}</output>
		<form class="options decoded">
			<slot name="decoder-options" />
		</form>
	</div>
{/if}

<style lang="scss">
	.cipher-name {
		font-size: 1rem;
		margin: 0;
		white-space: nowrap;
	}
</style>
