import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure `pageExtensions`` to include MDX files
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	// Optionally, add any other Next.js config below
	redirects: async () => {
		return [
			{
				source: "/docs",
				destination: "/docs/getting-started",
				permanent: true,
			},
			{
				source: "/protected",
				destination: "/protected/dashboard",
				permanent: true,
			},
		];
	},
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			[
				rehypePrettyCode,
				{
					theme: "github-light",
				},
			],
		],
	},
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
