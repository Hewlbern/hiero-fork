import Head from "next/head";
import Matrix from '@/components/matrix';

export default function PaymentDemo() {
	const structuredData = {
		"@context": "https://schema.org",
			"@type": "WebPage",
			"name": "Hiero Payment Demo with Matrix-Style Chat UI",
			"description": "Experience Hiero's innovative payment system through an interactive demo featuring a Matrix-inspired chat interface. See how easy it is to manage multiple AI subscriptions with a single payment."
		};

	return (
		<>
			<Head>
				<title>Hiero Payment Demo | Matrix-Style Chat UI for AI Subscriptions</title>
				<meta
					name="description"
					content="Try Hiero's streamlined payment system for multiple AI subscriptions in our interactive demo. Experience our unique Matrix-inspired chat UI and see how easy managing AI services can be."
				/>
				<meta
					name="keywords"
					content="Hiero, payment demo, Matrix chat UI, AI subscription management, interactive demo, single payment system"
				/>
				<meta property="og:title" content="Hiero Payment Demo | Matrix-Style Chat UI for AI Subscriptions" />
				<meta
					property="og:description"
					content="Explore Hiero's innovative payment system for multiple AI subscriptions through our interactive demo featuring a Matrix-inspired chat interface. Simplify your AI service management today."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hiero.gl" />
				<link rel="canonical" href="https://hiero.gl" />
				<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
			</Head>
				<Matrix />
			
		</>
	);
}
