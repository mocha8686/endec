<script lang="ts">
	import { crc32 } from 'hash-wasm';

	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';

	let encoded = '';
	$: {
		if ($input.length > 0) {
			crc32($input).then((hash) => (encoded = hash));
		} else {
			encoded = '';
		}
	}
</script>

<Cipher name="CRC32" {encoded} />
