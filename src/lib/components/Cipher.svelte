<script lang="ts">
	import CipherUnit, { type State } from './CipherUnit.svelte';

	export let name: string;
	export let encoded: string | undefined | null = null;
	export let decoded: string | undefined | null = null;

	let encoderState: State | undefined = 'invalid';
	let decoderState: State | undefined = 'invalid';

	function isInvalid(state: State | undefined): boolean {
		return state === undefined || state === 'invalid';
	}
</script>

<h2 class="cipher-name ciphers-item" class:invalid={isInvalid(encoderState) && isInvalid(decoderState)}>{name}</h2>
<CipherUnit type="encode" output={encoded} solo={decoded === null} bind:state={encoderState}>
	<slot name="encoder-options" />
</CipherUnit>
<CipherUnit type="decode" output={decoded} solo={encoded === null} bind:state={decoderState}>
	<slot name="decoder-options" />
</CipherUnit>
