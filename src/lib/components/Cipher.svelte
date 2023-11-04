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
	export let name: string;

	export let encoded: string | undefined | null = null;
	export let decoded: string | undefined | null = null;

	$: [encoderString, encoderClass] = getOutputStringAndClass(encoded, 'encode');
	$: [decoderString, decoderClass] = getOutputStringAndClass(decoded, 'decode');
</script>

<h2 class="cipher-name ciphers-item">{name}</h2>

{#if encoded !== null}
	<div
		class="output-container encoded ciphers-item"
		class:solo={decoded === null}
	>
		<output
			class={`encoded ${encoderClass}`}
		>
			{encoderString}
		</output>
		<form class="options decoded">
			<slot class="options encoded" name="encoder-options" />
		</form>
	</div>
{/if}

{#if decoded !== null}
	<div
		class="output-container decoded ciphers-item"
		class:solo={encoded === null}
	>
		<output
			class={`decoded ${decoderClass}`}
		>
			{decoderString}
		</output>
		<form class="options decoded">
			<slot name="decoder-options" />
		</form>
	</div>
{/if}

<style lang="scss">
	@use '$lib/sass/abstracts/colors';

	.cipher-name {
		margin: 0;
		font-size: 1rem;
		white-space: nowrap;
	}

	output {
		transition: color 50ms ease;

		&.invalid {
			color: colors.$text-disabled;
		}

		&.placeholder {
			font-style: italic;
			color: colors.$text-placeholder;
		}
	}
</style>
