import Head from "next/head";
import { Button } from "@/components/ui/button";
import { JoinWaitlistModal } from "@/components/join-waitlist-modal";
import HieroTitle from "@/components/HieroTitle";

export default function Home() {
	return (
		<>
			<Head>
				<title>Hiero: One Subscription for Everything AI | All-in-One AI Platform</title>
				<meta name="description" content="Hiero offers a single subscription for all your AI needs. Access a wide range of AI tools, services, and resources with one simple plan." />
				<meta name="keywords" content="AI subscription, all-in-one AI, AI platform, artificial intelligence services, Hiero, machine learning, data science, AI tools, usage-based pricing, AI startups" />
				
				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hiero.gl" />
				<meta property="og:title" content="Hiero: One Subscription for Everything AI | All-in-One AI Platform" />
				<meta property="og:description" content="Simplify your AI journey with Hiero's all-inclusive subscription. One plan for all your artificial intelligence needs." />
				<meta property="og:image" content="https://hiero.gl/opengraph-image.jpeg" />
				<meta property="og:site_name" content="Hiero" />
				<meta property="og:locale" content="en_US" />
				
				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:url" content="https://hiero.gl" />
				<meta name="twitter:title" content="Hiero: One Subscription for Everything AI | All-in-One AI Platform" />
				<meta name="twitter:description" content="Simplify your AI journey with Hiero's all-inclusive subscription. One plan for all your artificial intelligence needs." />
				<meta name="twitter:image" content="https://hiero.gl/twitter-image.jpeg" />
				<meta name="twitter:creator" content="@HieroAI" />
				
				{/* Additional SEO tags */}
				<link rel="canonical" href="https://hiero.gl" />
				<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
				<meta name="author" content="Hiero" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content="#34d399" />
				
				{/* Structured Data */}
				<script type="application/ld+json">
					{`
						{
							"@context": "https://schema.org",
							"@type": "SoftwareApplication",
							"name": "Hiero",
							"applicationCategory": "AIApplication",
							"operatingSystem": "Web",
							"description": "Hiero offers a single subscription for all your AI needs. Access a wide range of AI tools, services, and resources with one simple plan.",
							"offers": {
								"@type": "Offer",
								"price": "29.99",
								"priceCurrency": "USD"
							}
						}
					`}
				</script>
			</Head>
			<main className="min-h-screen bg-cyan-50 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
				<HieroTitle size="large" />
				<p className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-16 text-center max-w-3xl text-white bg-black p-4 sm:p-8 border-4 sm:border-8 border-x-green-100 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,0.5)] transform -rotate-1">
					AI Payments - Auditable context, for verifiable claims. {" "}
					<span className="font-black bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
						Be part of the future.
					</span>
				</p>
				<JoinWaitlistModal>
					<Button className="mb-4 bg-white text-black text-3xl sm:text-4xl md:text-6xl font-black py-6 sm:py-8 md:py-12 px-10 sm:px-16 md:px-20 hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-4 sm:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
						<span className="relative z-10 transform -skew-x-12">
							Join Waitlist
						</span>
						<span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-500 transform -skew-x-12 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
					</Button>
				</JoinWaitlistModal>
				
				{/* FAQ Links */}
				{/* <div className="absolute bottom-4 right-4 text-sm text-gray-600">
					<Link href="/blog/user-faq" className="mr-4 hover:underline">User FAQ</Link>
					<Link href="/blog/business-faq" className="hover:underline">Business FAQ</Link>
				</div> */}
			</main>
		</>
	);
}
