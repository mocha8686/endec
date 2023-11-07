<script lang="ts" context="module">
	import { mod } from '$lib/mod';

	export function caesar(
		input: string,
		shift: number,
		mode: 'encode' | 'decode'
	): string {
		const ALPHABETS = [
			'abcdefghijklmnopqrstuvwxyz',
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		];

		const shiftedAlphabets = ALPHABETS.reduce(
			(acc: { [key: string]: string }, alphabet) => {
				alphabet.split('').forEach((c, i) => {
					acc[c] = alphabet.charAt(
						mod(mode === 'encode' ? i + shift : i - shift, alphabet.length)
					);
				});
				return acc;
			},
			{}
		);

		return input
			.split('')
			.map((c) => shiftedAlphabets[c] ?? c)
			.join('');
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';

	import { input } from '$lib/input';

	let encodeShift = 3;
	let decodeShift = 3;
	let sync = true;

	$: encoded = caesar($input, encodeShift, 'encode');
	$: decoded = caesar($input, sync ? encodeShift : decodeShift, 'decode');
</script>

<Cipher name="Caesar" {encoded} {decoded}>
	<svelte:fragment slot="encoder-options">
		<label>
			Shift
			<input type="number" min="0" max="26" bind:value={encodeShift} />
		</label>
		<label>
			Sync
			<input type="checkbox" bind:checked={sync} />
		</label>
	</svelte:fragment>
	<svelte:fragment slot="decoder-options">
		<label>
			Shift
			{#if sync}
				<input type="number" min="-26" max="26" bind:value={encodeShift} />
			{:else}
				<input type="number" min="-26" max="26" bind:value={decodeShift} />
			{/if}
		</label>
		<label>
			Sync
			<input type="checkbox" bind:checked={sync} />
		</label>
	</svelte:fragment>
</Cipher>
