<script lang="ts" context="module">
	export function getOutputStringAndClass(
		output: string | undefined | null,
		type: 'encode' | 'decode'
	): [string, 'invalid' | 'placeholder' | null] {
		if (output === null) {
			return ['', null];
		} else if (output === undefined) {
			return ['—', 'invalid'];
		} else if (output.length === 0) {
			switch (type) {
				case 'encode':
					return ['Encoded...', 'placeholder'];
				case 'decode':
					return ['Decoded...', 'placeholder'];
			}
		} else {
			return [output, null];
		}
	}
</script>

<script lang="ts">
	import { faX } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let type: 'encode' | 'decode';
	export let output: string | undefined | null;
	export let solo: boolean;

	$: [outputString, markerClass] = getOutputStringAndClass(output, type);

	let active = false;
	let menuNode: HTMLElement;

	function handleKeydown(e: KeyboardEvent) {
		if (e.key != 'Enter' || e.repeat) return;
		active = !active;
	}

	function handleDocumentClick(e: MouseEvent) {
		const element = e.target as HTMLElement;

		if (!menuNode.contains(element)) {
			active = false;
		}
	}
</script>

<svelte:document on:click={handleDocumentClick} />

{#if output !== null}
	<button
		bind:this={menuNode}
		class="output-menu ciphers-item"
		class:solo
		class:active
		on:click={() => (active = true)}
		on:keydown={handleKeydown}
		role="menu"
		tabindex="0"
	>
		<output class={markerClass}>
			{outputString}
		</output>
		<button class="close" on:click|stopPropagation={() => (active = false)}>
			<Fa icon={faX} />
		</button>
		{#if $$slots}
			<form class="options">
				<slot class="options" />
			</form>
		{/if}
	</button>
{/if}
