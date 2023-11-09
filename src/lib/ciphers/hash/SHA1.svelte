<script lang="ts">
	import { sha1 } from 'hash-wasm';

	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';

	let encoded = '';
	$: {
		if ($input.length > 0) {
			sha1($input).then((hash) => (encoded = hash));
		} else {
			encoded = '';
		}
	}
</script>

<Cipher name="SHA1" {encoded} />
