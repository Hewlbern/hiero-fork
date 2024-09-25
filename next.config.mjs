import nextra from "nextra";

const withNextra = nextra({
	theme: "nextra-theme-docs",
	themeConfig: "./theme.config.tsx",
	// ... your Nextra config
});

export default withNextra({
	// ... your Next.js config
	redirects: async () => {
		return [
			{
				source: "/docs",
				destination: "/docs/getting-started",
				permanent: true,
			},
		];
	},
});
