import Head from "next/head";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BusinessFAQ() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "What is Hiero and how does it work for AI businesses?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero is a subscription service that pays AI businesses based on their customers' usage. We handle billing, payments, and customer acquisition, allowing AI companies to focus on building great products."
				}
			},
			{
				"@type": "Question",
				"name": "How does Hiero improve checkout speed compared to Stripe?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero offers a streamlined, one-click checkout process for users across all integrated AI services, significantly reducing friction compared to traditional payment processors like Stripe."
				}
			},
			{
				"@type": "Question",
				"name": "What are the benefits of Hiero-paid initial free trials?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero covers the cost of initial free trials for your customers, reducing financial risk for AI businesses and helping to attract more potential long-term users without upfront costs."
				}
			},
			{
				"@type": "Question",
				"name": "How does Hiero provide access to a growing user cohort?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "By joining Hiero, AI businesses gain exposure to our rapidly expanding network of subscribers who are actively seeking AI services, boosting customer acquisition and market reach."
				}
			},
			{
				"@type": "Question",
				"name": "How does Hiero's usage-based payment model work?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Hiero's innovative model pays AI businesses based on the actual usage of their services by subscribers. This ensures fair compensation for the value provided, without the complexities of individual billing."
				}
			}
		]
	};

	return (
		<>
			<Head>
				<title>Hiero for AI Businesses: Subscription-Based Usage Payments | FAQ</title>
				<meta
					name="description"
					content="Discover how Hiero's innovative subscription model pays AI businesses based on customer usage. Learn about faster checkouts, free trials, and access to a growing AI-focused user base."
				/>
				<meta
					name="keywords"
					content="Hiero, AI business payments, usage-based subscriptions, faster checkouts, free trials, AI user cohort, SaaS billing"
				/>
				<meta property="og:title" content="Hiero for AI Businesses: Subscription-Based Usage Payments | FAQ" />
				<meta
					property="og:description"
					content="Hiero revolutionizes AI business monetization with usage-based payments, faster checkouts, and access to a growing subscriber base. Learn how it can benefit your AI company."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hiero.gl/business-faq" />
				<link rel="canonical" href="https://hiero.gl/business-faq" />
				<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
			</Head>
			<main className="min-h-screen bg-white text-black font-mono">
				<div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
					<h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center uppercase border-b-8 border-black pb-4">
						Hiero for AI Businesses: FAQ
					</h1>
					<p className="text-xl mb-12 text-center max-w-3xl mx-auto border-4 border-black p-4">
						Learn how Hiero's innovative subscription model can help your AI business grow and thrive.
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
