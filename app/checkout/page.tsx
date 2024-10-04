"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import SaveCardButton from "@/components/save-card-form";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";
import SignInStep from "@/components/checkout/sign-in-step";
import Footer from '@/components/checkout/checkout-footer';
import ConnectToHiero from '@/components/checkout/connect';

export default function Checkout() {
	const router = useRouter();
	const searchParams = useSearchParams()!;
	const appName = searchParams.get('appName');
	const appId = searchParams.get('appId');

	const [user, setUser] = useState<User | null>(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [cardSaved, setCardSaved] = useState(false);
	const [uuid, setUUID] = useState<string | null>(null);
	const [copiedUUID, setCopiedUUID] = useState(false);

	const supabase = createClient();

	useEffect(() => {
		const checkUser = async () => {
			const { data: { user } } = await supabase.auth.getUser();
			setUser(user);
			if (user) setCurrentStep(1);
		};
		checkUser();
	}, []);

	const handleSignIn = () => {
		setCurrentStep(1);
	};

	const handleCardSaved = () => {
		setCardSaved(true);
		setCurrentStep(2);
	};

	const handleGenerateUUID = async () => {
		if (appId) {
			try {
				const newUUID = await generateUserConnectionKey(appId);
				setUUID(newUUID);
				setCurrentStep(3);
			} catch (error) {
				console.error('Error generating UUID:', error);
			}
		} else {
			router.push(`/protected/dashboard`);
		}
	};

	const handleCopyUUID = () => {
		if (uuid) {
			navigator.clipboard.writeText(uuid);
			setCopiedUUID(true);
			setTimeout(() => setCopiedUUID(false), 2000);
		}
	};

	const handleGoToDashboard = () => {
		router.push(`/protected/dashboard/apps`);
	};

	const steps = [
		{ title: "Sign In" },
		{ title: "Save Card" },
		{ title: "Complete" },
		...(appName ? [{ title: "Connect" }] : []),
	];

	return (
		<div className="min-h-screen flex items-center justify-center pb-16">
			<motion.div 
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-[95%] max-w-3xl h-[90vh] flex flex-col bg-white border-4 sm:border-8 border-black shadow-[12px_12px_0_0_#000] sm:shadow-[24px_24px_0_0_#000] transition-all duration-300 hover:shadow-[6px_6px_0_0_#000] sm:hover:shadow-[12px_12px_0_0_#000] hover:translate-x-1 hover:translate-y-1 sm:hover:translate-x-3 sm:hover:translate-y-3"
			>
				<div className="flex-grow flex flex-col p-4 sm:p-6">
					{/* Header */}
					<motion.div 
						className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between mb-6"
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						{/* ... (Header content remains the same) ... */}
					</motion.div>

					{/* Steps */}
					<motion.div 
						className="flex-shrink-0 flex justify-center items-center px-4 space-x-8 mb-6"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.8 }}
					>
						{steps.map((step, index) => (
							<div key={index} className="flex flex-col items-center">
								<div className={`w-8 h-8 rounded-full ${index <= currentStep ? 'bg-gradient-to-r from-sky-500 to-emerald-500' : 'bg-gray-300'} flex items-center justify-center text-white font-bold`}>
									{index + 1}
								</div>
								<span className="text-sm mt-1">{step.title}</span>
							</div>
						))}
					</motion.div>

					{/* Action Area */}
					<motion.div 
						className="flex-grow flex flex-col items-center justify-center"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 1 }}
					>
						<AnimatePresence mode="wait">
							{!user ? (
								<SignInStep onSignIn={handleSignIn} />
							) : !cardSaved ? (
								<motion.div
									key="savecard"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
									className="w-full"
								>
									<SaveCardButton onSave={handleCardSaved} isTest={process.env.NODE_ENV === 'development'} />
								</motion.div>
							) : (
								<ConnectToHiero
									appName={appName}
									onGenerateUUID={handleGenerateUUID}
									onGoToDashboard={handleGoToDashboard}
								/>
							)}
						</AnimatePresence>
					</motion.div>
				</div>

				<Footer />
			</motion.div>
		</div>
	);
}