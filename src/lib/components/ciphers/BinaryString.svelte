<script lang="ts" context="module">
	export function binStringEncode(input: string, separate: number): string {
		const encoder = new TextEncoder();
		const bytes = encoder.encode(input);
		const binString = Array.from(bytes)
			.map((byte) => byte.toString(2).padStart(8, '0'))
			.join('');

		if (separate > 0) {
			const separated = binString
				.match(new RegExp(`.{1,${separate}}`, 'g'))
				?.join(' ');
			return separated ?? '';
		} else {
			return binString;
		}
	}

	export function binStringDecode(input: string): string | undefined {
		const noSpaces = input.replace(/\s/g, '');
		if (noSpaces.length === 0) return '';

		if (noSpaces?.match(/^[01]*$/) === null) return undefined;

		const bytes = noSpaces
			.match(/[01]{1,8}/g)!
			.map((binString) => parseInt(binString, 2));

		const decoder = new TextDecoder();
		const plaintext = decoder.decode(new Uint8Array(bytes));

		return plaintext;
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';

	import { input } from '$lib/input'

	let separate = 0;

	$: encoded = binStringEncode($input, separate);
	$: decoded = binStringDecode($input);
</script>

<Cipher name="Binary String" {encoded} {decoded}>
	<label slot="encoder-options">
		Separate at
		<select bind:value={separate}>
			<option value={0}>None</option>
			<option value={4}>Every 4 bits</option>
			{#each [1, 2, 3, 4, 8, 16] as numBytes}
				<option value={numBytes * 8}>
					Every {numBytes * 8} bits ({numBytes}
					{numBytes === 1 ? 'byte' : 'bytes'})
				</option>
			{/each}
		</select>
	</label>
</Cipher>
