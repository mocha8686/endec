<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';

	import { encode, decode } from 'morsee';

	export let input: string;

	$: encoded = encode(input);
	$: decoded = input.match(/^[\s/.-]*$/) ? decode(input).toUpperCase() : undefined;
</script>

<Cipher name="Morse" {encoded} {decoded} />
