<script lang="ts">
	import Cipher from '$lib/Cipher.svelte';

	export let input: string;

	let separate = 0;

	$: output = binStringEncode(input, separate);

	function binStringEncode(input: string, separate: number): string {
		const encoder = new TextEncoder();
		const bytes = encoder.encode(input);
		const binString = Array.from(bytes)
			.map((byte) => byte.toString(2).padStart(8, '0'))
			.join('');

		if (separate > 0) {
			const thing = binString
				.match(new RegExp(`.{1,${separate}}`, 'g'))
				?.join(' ');
			console.debug(thing);
			return thing ?? '';
		} else {
			return binString;
		}
	}
</script>

<Cipher name="Binary String" {output}>
	<label for="separate">Separate at</label>
	<select bind:value={separate} id="separate">
		<option value={0}>None</option>
		<option value={4}>Every 4 bits</option>
		{#each [1, 2, 3, 4, 8, 16] as numBytes}
			<option value={numBytes * 8}
				>Every {numBytes * 8} bits ({numBytes}
				{numBytes === 1 ? 'byte' : 'bytes'})</option
			>
		{/each}
	</select>
</Cipher>
