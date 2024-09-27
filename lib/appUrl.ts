export function appUrl(slug: string) {
	const baseUrl =
		typeof window !== "undefined"
			? window.location.origin
			: `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000"}`;
	return `${baseUrl}/a/${slug}`;
}
