<script lang="ts">
	import ciphers from '$lib/ciphers';

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

