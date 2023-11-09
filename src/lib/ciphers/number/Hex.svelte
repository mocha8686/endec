<script lang="ts" context="module">
	export function parseHex(input: string): number | undefined {
		const noSpaces = input.replace(/\s/g, '');

		const matches = noSpaces.match(/^(?:0x)?([\da-fA-F]*)$/);
		if (matches === null) return undefined;

		const number = Number.parseInt(matches[1], 16);
		return isNaN(number) ? undefined : number;
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input'
	import { parseNumber } from '$lib/number';

	$: encoded = $input.length === 0 ? '' : parseNumber($input)?.toString(16);
	$: decoded = $input.length === 0 ? '' : parseHex($input)?.toString();
</script>

<Cipher name="Hex" {encoded} {decoded} />
