export function appDomain() {
	// Updated function signature
	return typeof window !== "undefined"
		? window.location.origin
		: `${process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"}`;
}

export function appUrl(slug: string) {
	// Updated function signature

	return `https://${appDomain()}/a/${slug}`;
}
