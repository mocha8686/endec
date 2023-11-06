<script lang="ts" context="module">
	export function getOutputStringAndClass(
		output: string | undefined | null,
		type: 'encode' | 'decode'
	): [string, 'invalid' | 'placeholder' | null] {
		if (output === null) {
			return ['', null];
		} else if (output === undefined) {
			return ['—', 'invalid'];
		} else if (output.length === 0) {
			switch (type) {
				case 'encode':
					return ['Encoded...', 'placeholder'];
				case 'decode':
					return ['Decoded...', 'placeholder'];
			}
		} else {
			return [output, null];
		}
	}
</script>

<script lang="ts">
	import CipherUnit from './CipherUnit.svelte';

	export let name: string;
	export let encoded: string | undefined | null = null;
	export let decoded: string | undefined | null = null;
</script>

<h2 class="cipher-name ciphers-item">{name}</h2>
<CipherUnit type="encode" output={encoded} solo={decoded === null}>
	<slot name="encoder-options" />
</CipherUnit>
<CipherUnit type="decode" output={decoded} solo={encoded === null}>
	<slot name="decoder-options" />
</CipherUnit>
