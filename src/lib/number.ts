export function parseNumber(input: string): number | undefined {
	const noSpaces = input.replace(/\s/g, '');

	let matches;
	let radix = undefined;

	if (noSpaces.startsWith('0b')) {
		matches = noSpaces.match(/^0b([01]*)$/);
		radix = 2;
	} else if (noSpaces.startsWith('0o')) {
		matches = noSpaces.match(/^0o([0-7]*)$/);
		radix = 8;
	} else if (noSpaces.startsWith('0x')) {
		matches = noSpaces.match(/^(0x[\da-fA-F]*)$/);
	} else {
		matches = noSpaces.match(/^(\d*)$/);
	}

	if (matches === null) return undefined;
	const number = Number.parseInt(matches[1], radix);
	return isNaN(number) ? undefined : number;
}
