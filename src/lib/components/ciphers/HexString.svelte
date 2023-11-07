<script lang="ts" context="module">
	type Casing = 'upper' | 'lower';

	export function hexStringEncode(
		input: string,
		separate: number,
		casing: Casing
	): string {
		const encoder = new TextEncoder();
		const bytes = encoder.encode(input);
		let hexString = Array.from(bytes)
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');

		switch (casing) {
			case 'upper':
				hexString = hexString.toUpperCase();
				break;
			case 'lower':
				hexString = hexString.toLowerCase();
				break;
		}

		if (separate > 0) {
			const separated = hexString
				.match(new RegExp(`.{1,${separate}}`, 'g'))
				?.join(' ');
			return separated ?? '';
		} else {
			return hexString;
		}
	}

	export function hexStringDecode(input: string): string | undefined {
		const normalized = input.replace(/\s/g, '').toLowerCase();
		if (normalized.length === 0) return '';

		if (normalized.match(/^[0-9a-f]*$/) === null) return undefined;

		const bytes = normalized
			.match(/[0-9a-f]{1,2}/g)!
			.map((hexString) => parseInt(hexString, 16));

		const decoder = new TextDecoder();
		const plaintext = decoder.decode(new Uint8Array(bytes));

		return plaintext;
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';

	import { input } from '$lib/input'

	let separate = 0;
	let casing: Casing = 'lower';

	$: encoded = hexStringEncode($input, separate, casing);
	$: decoded = hexStringDecode($input);
</script>

<Cipher name="Hex String" {encoded} {decoded}>
	<svelte:fragment slot="encoder-options">
		<label>
			Separate at
			<select bind:value={separate}>
				<option value={0}>None</option>
				{#each [1, 2, 3, 4, 8, 16] as numBytes}
					<option value={numBytes * 2}>
						Every {numBytes}
						{numBytes === 1 ? 'byte' : 'bytes'}
					</option>
				{/each}
			</select>
		</label>
		<label>
			Casing
			<select bind:value={casing}>
				<option value="lower">Lower (a-f)</option>
				<option value="upper">Upper (A-F)</option>
			</select>
		</label>
	</svelte:fragment>
</Cipher>
