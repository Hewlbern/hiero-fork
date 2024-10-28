export function appUrl(protocol: string, host: string, slug: string): string {
	const urlString = `${protocol}//${host}/a/${slug}`;
	return new URL(urlString).toString();
}
