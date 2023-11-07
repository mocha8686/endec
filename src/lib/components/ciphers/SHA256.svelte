<script lang="ts">
	import { sha256 } from 'hash-wasm';

	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';

	let encoded = '';
	$: {
		if ($input.length > 0) {
			sha256($input).then((hash) => (encoded = hash));
		} else {
			encoded = '';
		}
	}
</script>

<Cipher name="SHA256" {encoded} />
