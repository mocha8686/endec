<script lang="ts">
	import Caesar from '$lib/ciphers/Caesar.svelte';

	const ciphers = [Caesar];

	let input = '';
</script>

<textarea bind:value={input} />

<ul>
	{#each ciphers as Cipher}
		<li>
			<Cipher {input} />
		</li>
	{/each}
</ul>
