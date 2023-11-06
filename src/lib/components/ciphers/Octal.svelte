<script lang="ts" context="module">
	export function parseOctal(input: string): number | undefined {
		const noSpaces = input.replace(/\s/g, '');

		const matches = noSpaces.match(/^(?:0o)?([0-7]*)$/);
		if (matches === null) return undefined;

		const number = Number.parseInt(matches[1], 8);
		return isNaN(number) ? undefined : number;
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';
	import { parseNumber } from '$lib/number';

	export let input: string;

	$: encoded = input.length === 0 ? '' : parseNumber(input)?.toString(8);
	$: decoded = input.length === 0 ? '' : parseOctal(input)?.toString();
</script>

<Cipher name="Octal" {encoded} {decoded} />
