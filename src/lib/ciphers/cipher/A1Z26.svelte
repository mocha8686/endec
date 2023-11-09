<script lang="ts" context="module">
	type Casing = 'uppercase' | 'lowercase';

	const CHARACTER_MAP: Record<string, number> = {
		A: 1,
		B: 2,
		C: 3,
		D: 4,
		E: 5,
		F: 6,
		G: 7,
		H: 8,
		I: 9,
		J: 10,
		K: 11,
		L: 12,
		M: 13,
		N: 14,
		O: 15,
		P: 16,
		Q: 17,
		R: 18,
		S: 19,
		T: 20,
		U: 21,
		V: 22,
		W: 23,
		X: 24,
		Y: 25,
		Z: 26,
	};

	export function encodeA1Z26(input: string): string | undefined {
		if (input.length === 0) return '';
		if (input.match(/^[\sa-zA-Z]*$/) === null) return undefined;

		return input
			.split(' ')
			.filter((s) => s.length > 0)
			.map((s) =>
				s
					.toUpperCase()
					.split('')
					.map((c) => CHARACTER_MAP[c])
					.join(' ')
			)
			.join(' / ');
	}

	export function decodeA1Z26(
		input: string,
		doMod: boolean,
		casing: Casing
	): string | undefined {
		if (input.length === 0) return '';
		if (input.match(/^[\s\d/-]*$/) === null) return undefined;

		const res = input
			.split('/')
			.map((s) =>
				s
					.trim()
					.split(' ')
					.filter((s) => s.length > 0)
					.map((s) =>
						Object.keys(CHARACTER_MAP).find(
							(c) =>
								CHARACTER_MAP[c] ===
								(doMod
									? mod(Number.parseInt(s) - 1, 26) + 1
									: Number.parseInt(s))
						)
					)
					.filter((item) => item !== undefined)
					.join('')
			)
			.join(' ');

		switch (casing) {
			case 'uppercase':
				return res.toUpperCase();
			case 'lowercase':
				return res.toLowerCase();
		}
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';
	import { mod } from '$lib/mod';

	let doMod = false;
	let casing: Casing = 'uppercase';

	$: encoded = encodeA1Z26($input);
	$: decoded = decodeA1Z26($input, doMod, casing);
</script>

<Cipher name="A1Z26" {encoded} {decoded}>
	<svelte:fragment slot="decoder-options">
		<label>
			Modulo
			<input type="checkbox" bind:checked={doMod} />
		</label>
		<label>
			Casing
			<select bind:value={casing}>
				<option value="uppercase">Uppercase</option>
				<option value="lowercase">Lowercase</option>
			</select>
		</label>
	</svelte:fragment>
</Cipher>
