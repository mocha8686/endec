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

	export let name: string;
	export let encoded: string | undefined | null = null;
	export let decoded: string | undefined | null = null;

	$: [encoderString, encoderClass] = getOutputStringAndClass(encoded, 'encode');
	$: [decoderString, decoderClass] = getOutputStringAndClass(decoded, 'decode');

	let encoderActive = false;
	let decoderActive = false;

	const enableEncoder = () => (encoderActive = true);
	const enableDecoder = () => (decoderActive = true);

	function handleClick(e: MouseEvent, enable: () => void) {
		if (
			(e.target as HTMLElement).parentElement?.className?.includes('active') ||
			e.target instanceof HTMLOptionElement
		) {
			e.stopPropagation();
			return;
		}

		enable();
	}

	function handleKeydown(e: KeyboardEvent, toggle: () => void) {
		if (e.key != 'Enter' || e.repeat) return;
		toggle();
	}
</script>

<h2 class="cipher-name ciphers-item">{name}</h2>

{#if encoded !== null}
	<div
		class="output-container ciphers-item"
		class:solo={decoded === null}
		class:active={encoderActive}
		on:click={(e) => handleClick(e, enableEncoder)}
		on:keydown={(e) => handleKeydown(e, enableEncoder)}
		role="menu"
		tabindex="0"
	>
		<output class={encoderClass}>
			{encoderString}
		</output>
		<button
			class="close"
			on:click|stopPropagation={() => (encoderActive = false)}
		>
			<Fa icon={faX} />
		</button>
		{#if $$slots['encoder-options']}
			<form class="options">
				<slot class="options" name="encoder-options" />
			</form>
		{/if}
	</div>
{/if}

{#if decoded !== null}
	<div
		class="output-container ciphers-item"
		class:solo={encoded === null}
		class:active={decoderActive}
		on:click={(e) => handleClick(e, enableDecoder)}
		on:keydown={(e) => handleKeydown(e, enableDecoder)}
		role="menu"
		tabindex="0"
	>
		<output class={decoderClass}>
			{decoderString}
		</output>
		<button
			class="close"
			on:click|stopPropagation={() => (decoderActive = false)}
		>
			<Fa icon={faX} />
		</button>
		{#if $$slots['decoder-options']}
			<form class="options">
				<slot name="decoder-options" />
			</form>
		{/if}
	</div>
{/if}

<style lang="scss">
	@use '$lib/sass/abstracts/colors';
	@use '$lib/sass/abstracts/mixins' as *;

	.cipher-name {
		margin: 0;
		font-size: 1rem;
		white-space: nowrap;
	}

	.output-container {
		@include clickable;

		overflow: clip;
		min-width: 0;
		text-overflow: ellipsis;
	}

	output {
		mix-blend-mode: color-dodge;
		transition: color 200ms ease;

		&.invalid {
			color: colors.$text-disabled;
		}

		&.placeholder {
			font-style: italic;
			color: colors.$text-placeholder;
		}
	}

	.options,
	.close {
		display: none;
	}

	.close {
		cursor: pointer;

		align-self: baseline;

		aspect-ratio: 1;

		border: none;

		transition: color 100ms ease-in-out;

		&:hover,
		&:focus-visible {
			color: red;
		}
	}

	.active {
		display: grid;
		grid-auto-rows: 1fr min-content;
		grid-template-columns: 1fr 1em;
		flex-direction: column;
		gap: 0.5em;

		background-color: colors.$accent-selected;

		output {
			@include textbox;

			cursor: text;

			overflow: clip auto;
			display: block;
			flex-grow: 1;

			min-width: 0;

			overflow-wrap: break-word;

			mix-blend-mode: normal;
		}

		.options,
		.close {
			display: initial;
		}
	}
</style>
