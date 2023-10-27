<script lang="ts">
	import ciphers from '$lib';

	let input = '';
</script>

<textarea bind:value={input} />

<ul>
	{#each ciphers as {name, cipher}}
		<li>{name}: {cipher(input)}</li>
	{/each}
</ul>
