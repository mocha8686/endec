<script lang="ts" context="module">
	export function initials(input: string): string {
		return input.split(' ').filter(s => s.length > 0).map(s => s.charAt(0)).join('');
	}
</script>

<script lang="ts">
	import Cipher from '$lib/components/Cipher.svelte';
	import { input } from '$lib/input';

	$: encoded = initials($input);
</script>

<Cipher name="Initials" {encoded} />
