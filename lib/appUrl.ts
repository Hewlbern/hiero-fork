export function appUrl(slug: string) {
	const baseUrl =
		typeof window !== "undefined"
			? window.location.origin
			: `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000"}`;

	console.log("appUrl", baseUrl, slug);
	console.log(
		"window.location.origin",
		typeof window !== "undefined" ? window.location.origin : undefined
	);
	console.log(
		"NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL",
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
	);
	console.log("NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);

	return `${baseUrl}/a/${slug}`;
}
