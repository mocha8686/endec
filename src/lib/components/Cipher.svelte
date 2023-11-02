<script lang="ts">
	export let name: string;

	export let encoded: string | undefined | null = null;
	export let decoded: string | undefined | null = null;
</script>

<div>
	<h3>{name}</h3>

	{#if encoded !== null}
		<div class:disabled={encoded === undefined}>
			{encoded}
			<slot name="encoder-options" />
		</div>
	{/if}

	{#if decoded !== null}
		<div class:disabled={decoded === undefined}>
			{decoded}
			<slot name="decoder-options" />
		</div>
	{/if}
</div>

<style lang="scss">
	.disabled {
		background-color: gray;
	}
</style>
