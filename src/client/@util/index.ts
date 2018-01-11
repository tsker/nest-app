export function alway(o) {
	return () => o;
}

export const delay = (ms) => new Promise((ok) => setTimeout(ok, ms));
