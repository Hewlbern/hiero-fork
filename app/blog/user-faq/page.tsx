import Head from "next/head";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UserFAQ() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "What is Hiero and how does it work for users?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero is a single subscription service that gives you access to multiple AI applications. You pay one fee to Hiero, and we distribute payments to AI providers based on your actual usage across different platforms."
				}
			},
			{
				"@type": "Question",
				"name": "Can I switch between different AI platforms with Hiero?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Yes! One of the key benefits of Hiero is the ability to switch between any AI platform provider at will. Your single subscription allows you to explore and use various AI services without being locked into a specific provider."
				}
			},
			{
				"@type": "Question",
				"name": "How does Hiero's usage-based payment model benefit me?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero's model ensures you only pay for what you use across different AI services. This flexibility allows you to try various AI tools without committing to multiple subscriptions, potentially saving you money and providing a more tailored AI experience."
				}
			},
			{
				"@type": "Question",
				"name": "Are there any limitations on which AI services I can use with Hiero?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero partners with a wide range of AI service providers. While you can access any of our partner services, the specific offerings may vary. We're constantly expanding our network to provide you with more options and capabilities."
				}
			},
			{
				"@type": "Question",
				"name": "How does Hiero simplify my AI service experience?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero streamlines your AI experience by offering a single point of billing and access for multiple AI services. This means one subscription, one payment, and one platform to manage all your AI needs, saving you time and reducing complexity."
				}
			}
		]
	};

	return (
		<>
			<Head>
				<title>Hiero for Users: Single Subscription for Multiple AI Applications | FAQ</title>
				<meta
					name="description"
					content="Discover how Hiero's innovative subscription model simplifies your AI experience with a single subscription for multiple AI applications. Learn about switching between providers, usage-based payments, and more."
				/>
				<meta
					name="keywords"
					content="Hiero, AI subscription, single billing, multiple AI applications, usage-based payments, AI user experience"
				/>
				<meta property="og:title" content="Hiero for Users: Single Subscription for Multiple AI Applications | FAQ" />
				<meta
					property="og:description"
					content="Hiero revolutionizes AI user experience with a single subscription for multiple AI applications, usage-based payments, and the flexibility to switch between providers. Learn how it can benefit your AI journey."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hiero.gl/user-faq" />
				<link rel="canonical" href="https://hiero.gl/user-faq" />
				<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
			</Head>
			<main className="min-h-screen bg-white text-black font-mono">
				<div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
					<h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center uppercase border-b-8 border-black pb-4">
						Hiero for Users: FAQ
					</h1>
					<p className="text-xl mb-12 text-center max-w-3xl mx-auto border-4 border-black p-4">
						Learn how Hiero's innovative subscription model can simplify your AI experience and provide more flexibility.
					</p>
					<div className="space-y-6">
						{structuredData.mainEntity.map((item, index) => (
							<div key={index} className="border-8 border-black">
								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value={`item-${index + 1}`}>
										<AccordionTrigger className="text-xl font-bold p-4 hover:bg-black hover:text-white transition-colors">
											{item.name}
										</AccordionTrigger>
										<AccordionContent className="p-4 bg-white border-t-8 border-black">
											{item.acceptedAnswer.text}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
