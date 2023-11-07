import A1Z26 from './components/ciphers/A1Z26.svelte';
import Base64 from './components/ciphers/Base64.svelte';
import Binary from './components/ciphers/Binary.svelte';
import BinaryString from './components/ciphers/BinaryString.svelte';
import Caesar from './components/ciphers/Caesar.svelte';
import Hex from './components/ciphers/Hex.svelte';
import HexString from './components/ciphers/HexString.svelte';
import Initials from './components/ciphers/Initials.svelte';
import Morse from './components/ciphers/Morse.svelte';
import Octal from './components/ciphers/Octal.svelte';
import Reverse from './components/ciphers/Reverse.svelte';
import Vigenere from './components/ciphers/Vigenere.svelte';

export default [
	BinaryString,
	HexString,
	Base64,
	Caesar,
	A1Z26,
	Vigenere,
	Morse,
	Binary,
	Octal,
	Hex,
	Initials,
	Reverse,
];
