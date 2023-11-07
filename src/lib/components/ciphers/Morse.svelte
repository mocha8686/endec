<script lang="ts">
	import { decode, encode } from 'morsee';

	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';

	let casing: 'uppercase' | 'lowercase' = 'uppercase';

	$: encoded = encode($input.trim().replace(/ {2,}/g, ' '));
	$: decoded = $input.match(/^[\s/.-]*$/)
		? casing === 'uppercase'
			? decode($input).toUpperCase()
			: decode($input).toLowerCase()
		: undefined;
</script>

<Cipher name="Morse" {encoded} {decoded}>
	<label slot="decoder-options">
		Casing
		<select bind:value={casing}>
			<option value="uppercase">Uppercase</option>
			<option value="lowercase">Lowercase</option>
		</select>
	</label>
</Cipher>
