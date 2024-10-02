export function appUrl(slug: string) {
	// Updated function signature
	const baseUrl =
		typeof window !== "undefined"
			? window.location.origin
			: `https://${process.env.NODE_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"}`;

	return `${baseUrl}/a/${slug}`;
}
