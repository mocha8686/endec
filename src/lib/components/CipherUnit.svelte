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
	import { input } from '$lib/input';

	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let type: 'encode' | 'decode';
	export let output: string | undefined | null;
	export let solo: boolean;

	$: [outputString, markerClass] = getOutputStringAndClass(output, type);

	let active = false;
	let menuNode: HTMLElement;

	const transitionParams = {
		duration: 200,
		easing: cubicInOut,
	};

	function handleKeydown(e: KeyboardEvent) {
		if (e.key != 'Enter' || e.repeat) return;
		active = !active;
	}

	function handleDocumentClick(e: MouseEvent) {
		const element = e.target as HTMLElement;

		if (menuNode && !menuNode.contains(element)) {
			active = false;
		}
	}

	const keyFunction = (() => {
		let lastActive = active;
		let lastMarkerClass = markerClass;

		return (active: typeof lastActive, markerClass: typeof lastMarkerClass) => {
			let res;
			if (active || lastActive) {
				res = lastMarkerClass;
			} else {
				res = markerClass;
				lastMarkerClass = markerClass;
			}

			lastActive = active;
			return res;
		};
	})();

	function copy() {
		navigator.clipboard.writeText(output ?? '');
	}

	function use() {
		if (typeof output === 'string' && output.length > 0) {
			$input = output;
		}
	}
</script>

<svelte:document on:click={handleDocumentClick} />

{#if output !== null}
	<button
		type="button"
		bind:this={menuNode}
		class="output-menu ciphers-item"
		class:solo
		class:active
		on:click={() => (active = true)}
		on:keydown={handleKeydown}
		role="menu"
		tabindex="0"
	>
		<div class="output-container">
			{#key keyFunction(active, markerClass)}
				<output
					in:fly={{ ...transitionParams, y: '-100%' }}
					out:fly={{ ...transitionParams, y: '100%' }}
					class={markerClass}
				>
					{outputString}
				</output>
			{/key}
			<button type="button" class="textbox-button top-right" on:click={copy}>
				Copy
			</button>
			<button type="button" class="textbox-button bottom-right" on:click={use}>
				Use
			</button>
		</div>
		{#if $$slots}
			<form class="options">
				<slot class="options" />
			</form>
		{/if}
	</button>
{/if}
