"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Head from "next/head"
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HieroLandingPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"headline": "Unified AI App Subscription with Usage-Based Pricing | Hiero",
		"description": "Access multiple AI apps with a single subscription through Hiero. Enjoy usage-based billing and streamline your AI tools on one unified platform.",
		"image": "https://hiero.gl/0_0.jpeg",
		"url": "https://hiero.gl/all-in-one-ai-subscription",
		"author": {
			"@type": "Organization",
			"name": "Hiero",
			"url": "https://hiero.gl"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Hiero",
			"logo": {
				"@type": "ImageObject",
				"url": "https://hiero.gl/logo.png"
			}
		},
		"datePublished": new Date().toISOString(),
		"dateModified": new Date().toISOString()
	}

	return (
		<>
			<Head>
				<title>Unified AI App Subscription with Usage-Based Pricing | Hiero</title>
				<meta
					name="description"
					content="Streamline your AI workflow with Hiero's all-in-one subscription. Access multiple AI apps, enjoy usage-based billing, and maximize efficiency on our unified platform."
				/>
				<meta
					name="keywords"
					content="AI subscription, usage-based billing, unified AI platform, AI app marketplace, pay-per-use AI services, machine learning tools, NLP applications, computer vision solutions"
				/>
				<meta property="og:title" content="Unified AI App Subscription with Usage-Based Pricing | Hiero" />
				<meta
					property="og:description"
					content="Streamline your AI workflow with Hiero's all-in-one subscription. Access multiple AI apps, enjoy usage-based billing, and maximize efficiency on our unified platform."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hiero.gl/all-in-one-ai-subscription" />
				<meta property="og:image" content="https://hiero.gl/0_0.jpeg" />
				<meta property="og:site_name" content="Hiero" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Unified AI App Subscription with Usage-Based Pricing | Hiero" />
				<meta
					name="twitter:description"
					content="Streamline your AI workflow with Hiero's all-in-one subscription. Access multiple AI apps, enjoy usage-based billing, and maximize efficiency on our unified platform."
				/>
				<meta name="twitter:image" content="https://hiero.gl/0_0.jpeg" />
				<link rel="canonical" href="https://hiero.gl/all-in-one-ai-subscription" />
				<script type="application/ld+json">{JSON.stringify(structuredData)}</script>
			</Head>
			<div className="min-h-screen bg-white text-black font-sans">
			

				{/* Hero Section */}
				<section className="px-4 py-12 md:py-24 border-b-4 border-black">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-6xl font-black mb-6">Unified AI App Subscription with Usage-Based Pricing</h1>
						<p className="text-xl mb-8">Welcome to Hiero, your gateway to a unified AI app platform. Experience the future of AI technology with our all-in-one AI subscription, where you can access multiple AI apps seamlessly. Say goodbye to juggling numerous subscriptions and embrace a single subscription for all AI apps with usage-based billing.</p>
						<Link href="/sign-up">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-black text-white px-8 py-4 text-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200"
							>
								Sign Up Now
							</motion.button>
						</Link>
					</div>
				</section>

				{/* Features Section */}
				<section className="px-4 py-12 md:py-24 border-b-4 border-black">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-black mb-8">Why Choose an All-in-One AI Subscription?</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<FeatureCard title="Streamline AI App Access" description="Unlock a suite of AI applications under one roof." />
							<FeatureCard title="Simplify AI Tool Usage" description="No more switching between platforms; manage everything in one place." />
							<FeatureCard title="Comprehensive AI Solutions" description="From machine learning to natural language processing, we've got you covered." />
							<FeatureCard title="Flexible AI App Payments" description="Only pay for what you use with our usage-based AI pricing model." />
						</div>
					</div>
				</section>

				{/* Usage-Based Billing Section */}
				<section className="px-4 py-12 md:py-24 border-b-4 border-black bg-black text-white">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-black mb-8">How Usage-Based Billing Works</h2>
						<div className="space-y-6">
							<BillingFeature title="Pay-as-You-Go AI Apps" description="Your costs align with your actual usage." />
							<BillingFeature title="Transparent AI App Usage Billing" description="Monitor your usage and expenses in real-time." />
							<BillingFeature title="Cost-Effective" description="Avoid overpaying for unused services with our pay-per-use AI services model." />
						</div>
					</div>
				</section>

				{/* Getting Started Section */}
				<section className="px-4 py-12 md:py-24 border-b-4 border-black">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-black mb-8">Getting Started with Hiero</h2>
						<div className="space-y-6">
							<Step number={1} title="Sign Up Today" description="Create your account in minutes." />
							<Step number={2} title="Choose Your AI Tools" description="Select from a wide array of AI applications." />
							<Step number={3} title="Customize Your Experience" description="Tailor the platform to fit your specific requirements." />
							<Step number={4} title="Start Innovating" description="Leverage the power of AI to drive your projects forward." />
						</div>
						<Link href="/sign-up">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="mt-12 bg-black text-white px-8 py-4 text-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200"
							>
								Get Started Now
							</motion.button>
						</Link>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="px-4 py-12 md:py-24 border-b-4 border-black">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-black mb-8">Frequently Asked Questions</h2>
						<div className="space-y-6">
							<FAQItem 
								question="What is Hiero?" 
								answer="Hiero is an AI app aggregator that offers a single subscription for all AI apps. It allows users to access multiple AI tools and services through one platform with usage-based billing."
							/>
							<FAQItem 
								question="How does usage-based billing benefit me?" 
								answer="With pay-per-use AI services, you only pay for the applications and features you utilize. This flexible AI app payment model helps reduce costs and increases efficiency."
							/>
							<FAQItem 
								question="What types of AI applications can I access on Hiero?" 
								answer="Hiero provides a diverse AI app marketplace, including tools for data analysis, machine learning, natural language processing, computer vision, and more."
							/>
							<FAQItem 
								question="Can I manage all my AI applications in one place?" 
								answer="Yes! Hiero offers unified AI management, allowing you to oversee all your AI apps from a single, user-friendly dashboard."
							/>
						</div>
						<div className="mt-8 text-center">
							<p className="text-lg mb-4">For more information, check out our detailed FAQs:</p>
							<Link href="/blog/user-faq" className="text-blue-600 hover:underline mr-4">User FAQ</Link>
							<Link href="/blog/business-faq" className="text-blue-600 hover:underline">Business FAQ</Link>
						</div>
					</div>
				</section>

				{/* Hiero Advantage Section */}
				<section className="px-4 py-12 md:py-24 border-b-4 border-black">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-black mb-8">Discover the Hiero Advantage</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<FeatureCard title="All-in-One Access" description="One subscription unlocks a world of AI possibilities." />
							<FeatureCard title="Cost-Efficient" description="Our usage-based AI pricing ensures you only pay for what you need." />
							<FeatureCard title="Scalable Solutions" description="Easily scale your AI usage up or down based on your project requirements." />
							<FeatureCard title="Expert Support" description="Our team is here to help you maximize the platform's potential." />
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="px-4 py-12 md:py-24 border-b-4 border-black bg-gray-100">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl md:text-4xl font-black mb-6">Ready to revolutionize your AI experience?</h2>
						<p className="text-xl mb-8">Join the many who have transformed their workflow with Hiero's all-in-one AI subscription. With our usage-based AI pricing, you have the flexibility and control to innovate without limits.</p>
						<Link href="/sign-up">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-black text-white px-8 py-4 text-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200"
							>
								Get Started with Hiero Today
							</motion.button>
						</Link>
					</div>
				</section>

			
			</div>
		</>
	)
}

function FeatureCard({ title, description }: { title: string; description: string }) {
	return (
	  <div className="border-4 border-black p-6 hover:bg-gray-100 transition-colors duration-200">
		<h3 className="text-xl font-bold mb-2">{title}</h3>
		<p>{description}</p>
	  </div>
	)
  }
  
  function BillingFeature({ title, description }: { title: string; description: string }) {
	return (
	  <div className="flex items-start space-x-4">
		<Check className="mt-1 flex-shrink-0" />
		<div>
		  <h3 className="text-xl font-bold">{title}</h3>
		  <p>{description}</p>
		</div>
	  </div>
	)
  }
  
  function Step({ number, title, description }: { number: number; title: string; description: string }) {
	return (
	  <div className="flex items-start space-x-4">
		<div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
		  {number}
		</div>
		<div>
		  <h3 className="text-xl font-bold">{title}</h3>
		  <p>{description}</p>
		</div>
	  </div>
	)
  }
  
  function FAQItem({ question, answer }: { question: string; answer: string }) {
	const [isOpen, setIsOpen] = useState(false)
  
	return (
	  <div className="border-4 border-black">
		<button
		  className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
		  onClick={() => setIsOpen(!isOpen)}
		>
		  <span className="font-bold">{question}</span>
		  <ArrowRight className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
		</button>
		{isOpen && (
		  <div className="p-4 border-t-4 border-black">
			<p>{answer}</p>
		  </div>
		)}
	  </div>
	)
  }