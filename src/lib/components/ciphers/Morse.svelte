<script lang="ts">
	import { decode, encode } from 'morsee';

	import Cipher from '$lib/components/Cipher.svelte';

	export let input: string;

	$: encoded = encode(input.trim().replace(/ {2,}/g, ' '));
	$: decoded = input.match(/^[\s/.-]*$/)
		? decode(input).toUpperCase()
		: undefined;
</script>

<Cipher name="Morse" {encoded} {decoded} />
