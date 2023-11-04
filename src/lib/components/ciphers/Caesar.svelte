<script lang="ts" context="module">
	export function caesar(input: string, shift: number): string {
		const ALPHABETS = [
			'abcdefghijklmnopqrstuvwxyz',
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		];

		const shiftedAlphabets = ALPHABETS.reduce(
			(acc: { [key: string]: string }, alphabet) => {
				alphabet.split('').forEach((c, i) => {
					acc[c] = alphabet.charAt(mod(i + shift, alphabet.length));
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

	const mod = (n: number, m: number) => ((n % m) + m) % m;
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';

	export let input: string;
	let shift = 3;
	$: encoded = caesar(input, shift);
</script>

<Cipher name="Caesar" {encoded}>
	<label slot="encoder-options">
		Shift
		<input type="number" min="0" max="26" bind:value={shift} />
	</label>
</Cipher>
