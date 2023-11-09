<script lang="ts" context="module">
	export function parseBinary(input: string): number | undefined {
		const noSpaces = input.replace(/\s/g, '');

		const matches = noSpaces.match(/^(?:0b)?([01]*)$/);
		if (matches === null) return undefined;

		const number = Number.parseInt(matches[1], 2);
		return isNaN(number) ? undefined : number;
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input'
	import { parseNumber } from '$lib/number';

	$: encoded = $input.length === 0 ? '' : parseNumber($input)?.toString(2);
	$: decoded = $input.length === 0 ? '' : parseBinary($input)?.toString();
</script>

<Cipher name="Binary" {encoded} {decoded} />
