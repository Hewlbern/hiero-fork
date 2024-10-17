export const extractDomainFromUrl = (url: string): string => {
	try {
		const urlObject = new URL(url);
		return urlObject.hostname;
	} catch (error) {
		// If the URL is invalid, return the original input
		return url;
	}
};

export const generateSlugFromDomain = (domain: string): string => {
	// Remove common TLDs
	const domainWithoutTld = domain.replace(/\.(com|org|net|io|app|co|dev)$/, "");
	// Convert to lowercase, replace non-alphanumeric characters with hyphens,
	// and remove leading/trailing hyphens
	return domainWithoutTld
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
};
