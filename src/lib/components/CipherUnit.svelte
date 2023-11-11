<script lang="ts" context="module">
	export type State = 'invalid' | 'placeholder' | null;

	export function getOutputStringAndState(
		output: string | undefined | null,
		type: 'encode' | 'decode'
	): [string, State] {
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
	import { faCopy, faUpLong } from '@fortawesome/free-solid-svg-icons';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa';

	import { input } from '$lib/input';

	export let type: 'encode' | 'decode';
	export let output: string | undefined | null;
	export let solo: boolean;

	let outputString = '';
	export let state: State = 'invalid';
	$: [outputString, state] = getOutputStringAndState(output, type);

	let active = false;
	let menuNode: HTMLElement;

	const transitionParams = {
		duration: 200,
		easing: cubicInOut,
	};

	const keyFunction = (() => {
		let lastActive = active;
		let lastState = state;

		return (active: typeof lastActive, state: typeof lastState) => {
			let res;
			if (active || lastActive) {
				res = lastState;
			} else {
				res = state;
				lastState = state;
			}

			lastActive = active;
			return res;
		};
	})();

	function handleDocumentClick(e: MouseEvent) {
		const element = e.target as HTMLElement;

		if (menuNode && !menuNode.contains(element)) {
			active = false;
		}
	}

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
		role="menu"
		tabindex="0"
	>
		<div class="output-container">
			{#key keyFunction(active, state)}
				<output
					in:fly={{ ...transitionParams, y: '-100%' }}
					out:fly={{ ...transitionParams, y: '100%' }}
					class={state}
				>
					{outputString}
				</output>
			{/key}
			<button
				type="button"
				class="textbox-button output-button"
				on:click={copy}
			>
				<Fa icon={faCopy} />
				Copy
			</button>
			<button type="button" class="textbox-button output-button" on:click={use}>
				<Fa icon={faUpLong} />
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
