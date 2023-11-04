<script lang="ts" context="module">
	import { decode, encode } from 'js-base64';

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

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';

	export let input: string;

	$: encoded = base64Encode(input);
	$: decoded = base64Decode(input);
</script>

<Cipher name="Base64" {encoded} {decoded}></Cipher>
