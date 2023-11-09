<script lang="ts">
	import { md5 } from 'hash-wasm';

	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';

	let encoded = '';
	$: {
		if ($input.length > 0) {
			md5($input).then((hash) => (encoded = hash));
		} else {
			encoded = '';
		}
	}
</script>

<Cipher name="MD5" {encoded} />
