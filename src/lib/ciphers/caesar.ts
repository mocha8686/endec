import type { Cipher } from '$lib';

export default {
	name: 'Caesar',
	cipher(input: string): string {
		const SHIFT = 3;

		const ALPHABETS = [
			'abcdefghijklmnopqrstuvwxyz',
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		];

		const shiftedAlphabetPairs = ALPHABETS.reduce(
			(acc: { [key: string]: string }, alphabet) => {
				alphabet.split('').forEach((c, i) => {
					acc[c] = alphabet.charAt((i + SHIFT) % alphabet.length);
				});
				return acc;
			},
			{}
		);

		console.log(shiftedAlphabetPairs);

		return input.split('').map(c => shiftedAlphabetPairs[c] ?? c).join('');
	},
} satisfies Cipher;
