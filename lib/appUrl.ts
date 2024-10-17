export function appDomain() {
	// Updated function signature
	return typeof window !== "undefined"
		? // Start of Selection
			`${window.location.hostname}:${window.location.port}`
		: `${process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"}`;
}

export function appProtocol() {
	return typeof window !== "undefined"
		? window.location.protocol
		: process.env.VERCEL_ENV === "development"
			? "http:"
			: "https:";
}

export function appUrl(slug: string) {
	// Updated function signature

	return `${appProtocol()}//${appDomain()}/a/${slug}`;
}
