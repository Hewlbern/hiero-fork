"use client";

import Head from "next/head";
import { Button } from "@/components/ui/button";
import { JoinWaitlistModal } from "@/components/join-waitlist-modal";

export default function Home() {
	return (
		<>
			<Head>
				<title>Hiero: One Subscription for Everything AI | All-in-One AI Platform</title>
				<meta
					name="description"
					content="Hiero offers a single subscription for all your AI needs. Access a wide range of AI tools, services, and resources with one simple plan."
				/>
				<meta
					name="keywords"
					content="AI subscription, all-in-one AI, AI platform, artificial intelligence services, Hiero"
				/>
				<meta
					property="og:title"
					content="Hiero: One Subscription for Everything AI | All-in-One AI Platform"
				/>
				<meta
					property="og:description"
					content="Simplify your AI journey with Hiero's all-inclusive subscription. One plan for all your artificial intelligence needs."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://hiero.gl" />
					<link rel="canonical" href="https://hiero.gl" />
			</Head>
			<main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
				<h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-6 sm:mb-12 text-center text-white uppercase tracking-tighter transform -skew-x-12 rotate-2 border-4 sm:border-8 border-black p-2 sm:p-4 bg-black shadow-[8px_8px_0px_0px_rgba(255,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(255,0,0,1)] transition-all duration-300 hover:rotate-0 hover:skew-x-0 hover:scale-105 hover:shadow-[0px_0px_0px_4px_rgba(255,255,255,1),0px_0px_0px_8px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2">
					Hiero
				</h1>
				<p className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-16 text-center max-w-3xl text-white bg-black p-4 sm:p-8 border-4 sm:border-8 border-x-green-100 shadow-neutral-400 sm:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transform -rotate-1">
					A brand new way to charge for usage based apps.{" "}
					<span className="font-black text-red-600">
						Be part of the future.
					</span>
				</p>
				<JoinWaitlistModal>
					<Button className="mb-4 bg-white text-black text-3xl sm:text-4xl md:text-6xl font-black py-6 sm:py-8 md:py-12 px-10 sm:px-16 md:px-20 hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-4 sm:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
						<span className="relative z-10 transform -skew-x-12">
							Join Waitlist
						</span>
						<span className="absolute inset-0 bg-red-600 transform -skew-x-12 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
					</Button>
				</JoinWaitlistModal>
			</main>
		</>
	);
}
