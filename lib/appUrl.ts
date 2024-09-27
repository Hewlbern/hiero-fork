export function appUrl(slug: string, headers?: Headers) {
	// Updated function signature
	const baseUrl =
		typeof window !== "undefined"
			? window.location.origin
			: headers
				? `https://${headers.get("host")}`
				: `https://${process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"}`;

	console.log("appUrl", baseUrl, slug);
	console.log(
		"window.location.origin",
		typeof window !== "undefined" ? window.location.origin : undefined
	);
	console.log(
		"headers",
		typeof headers !== "undefined" ? headers.get("host") : undefined
	);
	console.log(
		"NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL",
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
	);
	console.log("NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);

	return `${baseUrl}/a/${slug}`;
}
