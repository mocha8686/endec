import caesar from "./ciphers/caesar";

export interface Cipher {
	name: string;
	cipher: (input: string) => string;
};

export default [
	caesar,
];
