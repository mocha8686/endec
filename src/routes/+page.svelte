<script lang="ts">
	import { decoders, encoders } from '$lib/ciphers';

	let input = '';
</script>

<textarea bind:value={input} />

<h2>Encoding</h2>
<ul>
	{#each encoders as Encoder}
		<li>
			<Encoder {input} />
		</li>
	{/each}
</ul>

<h2>Decoding</h2>
<ul>
	{#each decoders as Decoder}
		<li>
			<Decoder {input} />
		</li>
	{/each}
</ul>
