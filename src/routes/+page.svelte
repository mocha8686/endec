<script lang="ts">
	import cipherGroups from '$lib/ciphers';
	import { input } from '$lib/input';

	let fileNode: HTMLInputElement;

	async function useFile(_e: Event) {
		const file = fileNode?.files?.[0];
		if (!file) return;

		if (file.type.startsWith('text/')) {
			$input = (await file.text()).trim();
		}
	}
</script>

<form class="input-container">
	<textarea class="textbox" bind:value={$input} />
	<button
		type="button"
		class="textbox-button"
		on:click={() => fileNode.click()}
	>
		Upload
	</button>
	<input type="file" accept="text/*" bind:this={fileNode} on:change={useFile} />
</form>

<ul class="ciphers">
	{#each Object.entries(cipherGroups) as [group, ciphers]}
		<li class="group">
			{group}
		</li>
		{#each ciphers as Cipher}
			<li class="cipher">
				<Cipher />
			</li>
		{/each}
	{/each}
</ul>

<style lang="scss">
	@use '$lib/sass/abstracts/mixins' as *;

	.input-container {
		@include textbox-grid(5.5em, 1);
	}

	.textbox {
		width: 100%;
	}

	input[type='file'] {
		display: none;
	}
</style>
