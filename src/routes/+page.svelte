<script lang="ts">
	import cipherGroups from '$lib/ciphers';
	import { input } from '$lib/input';

	let fileNode: HTMLInputElement;

	let imgData: string | undefined = undefined;

	async function useFile() {
		const file = fileNode?.files?.[0];
		if (!file) return;

		if (file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.addEventListener('loadend', () => {
				const res = reader.result;
				if (typeof res === 'string') {
					imgData = res;
				}
			});
			reader.readAsDataURL(file);
		} else {
			imgData = undefined;
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
	<input
		type="file"
		accept="image/*, text/*"
		bind:this={fileNode}
		on:change={useFile}
	/>
</form>

{#if imgData}
	<div class="img-container">
		<img src={imgData} alt="Uploaded" />
	</div>
{/if}

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

	.img-container {
		max-height: 30dvmin;
		margin-block: 2em;
		display: flex;
		justify-content: center;

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}
	}
</style>
