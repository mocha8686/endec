<script lang="ts">
	import { encode, decode } from '@leodog896/vigenere-cipher';
	import Cipher from '$lib/components/Cipher.svelte';

	export let input: string;

	let encryptionKey = '';
	let decryptionKey = '';
	let sync = true;

	$: encoded = wrapper(input, encryptionKey, encode);
	$: decoded = wrapper(input, sync ? encryptionKey : decryptionKey, decode);

	function wrapper(
		input: string,
		key: string,
		fn: (input: string, key: string) => string
	): string | undefined {
		if (input.length === 0) return '';
		if (key.length === 0) return input;
		return fn(input, key);
	}
</script>

<Cipher name="Vigenère" {encoded} {decoded}>
	<svelte:fragment slot="encoder-options">
		<label>
			Key
			<input type="text" bind:value={encryptionKey} />
		</label>
		<label
			>Sync keys
			<input type="checkbox" bind:checked={sync} />
		</label>
	</svelte:fragment>

	<svelte:fragment slot="decoder-options">
		<label>
			Key
			{#if sync}
				<input type="text" bind:value={encryptionKey} />
			{:else}
				<input type="text" bind:value={decryptionKey} />
			{/if}
		</label>
		<label>
			Sync keys
			<input type="checkbox" bind:checked={sync} />
		</label>
	</svelte:fragment>
</Cipher>
