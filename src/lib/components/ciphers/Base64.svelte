<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';
	import { decode, encode } from 'js-base64';

	export let input: string;

	$: encoded = base64Encode(input);
	$: decoded = base64Decode(input);

	export function base64Encode(input: string): string {
		return encode(input);
	}

	export function base64Decode(input: string): string | undefined {
		try {
			return decode(input);
		} catch (e) {
			return undefined;
		}
	}
</script>

<Cipher name="Base64" {encoded} {decoded}></Cipher>
