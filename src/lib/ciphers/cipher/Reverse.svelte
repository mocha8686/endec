<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';

	$: encoded = $input.split('').reverse().join('');
</script>

<Cipher name="Reverse" {encoded} />
