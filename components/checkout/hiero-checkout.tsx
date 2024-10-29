"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Calendar, Lock, Mail, ArrowRight, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";
import {
	signInWithGoogleAuth,
	handleSignInWithOTP,
	handleVerifyOTP,
} from "@/app/actions/auth";
import { EmailChangeModal } from "@/components/auth/email-modal";
import SignInComponent from "@/components/checkout/ui/otp-step"; // Add this import
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import AppInfo from "./ui/app-info";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

type AIApp = {
	id: string;
	name: string;
	icon: React.ReactNode;
	color: string;
	loginUrl: string;
	uuid: string;
	rating: string;
	multiplier: string;
	tokenPrice: string;
	amountSpent: number;
	usage: number;
	slug: string;
	email: string; // Add this line
	redirectUrl: string; // Add this line
};

type AIAppProps = {
	app: AIApp;
	PaymentComponent: React.ComponentType<SaveCardButtonProps>; // Add this line
	test?: boolean; // Add this line
};

interface SaveCardButtonProps {
	onSave?: () => void;
	isTest?: boolean;
}

// Add this near the top of your file, outside of the component

// Add this type definition
type GoogleAuthResult = {
	user: User | null;
	error?: string;
};

// New Header component
function Header() {
	return (
		<div className="text-center">
			<h1 className="text-4xl text-black font-bold mb-1">Hiero</h1>
			<p className="text-sm text-gray-600 mb-2">Use everywhere</p>
			<div className="w-16 h-0.5 bg-white mx-auto"></div>
		</div>
	);
}
// New EmailInfo component
function EmailInfo({
	email,
	onChangeEmail,
}: {
	email: string;
	onChangeEmail: () => void;
}) {
	return (
		<Card className="mb-8">
			<CardContent className="p-4 flex items-center">
				<div className="w-10 h-10 bg-black rounded-full mr-4 flex items-center justify-center text-white">
					<Mail size={20} />
				</div>

				<div className="flex-grow">
					<Link
						href="#"
						className=" text-sm text-black font-medium hover:underline"
						onClick={onChangeEmail}
					>
						{email}
					</Link>

					<p className="text-xs text-gray-500">
						Balance: 1,000,000 free tokens!
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

export function HieroCheckout({ app, PaymentComponent }: AIAppProps) {
	const isDevelopment = true;
	//process.env.NODE_ENV === 'development'  || test
	const router = useRouter();
	const [uuid, setUUID] = useState<string | null>(null);
	const [user, setUser] = useState<Session["user"] | null>(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [cardSaved, setCardSaved] = useState(false);
	const [step, setStep] = useState("first");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showEmailModal, setShowEmailModal] = useState(false);

	const { data: session } = useSession();
	const supabase = createClient();

	useEffect(() => {
		const checkUser = async () => {
			if (session?.user) {
				setUser(session.user);
				setCurrentStep(1);
			}
		};
		checkUser();
	}, []);

	const handleSignInWithOTPCheck = async () => {
		setIsLoading(true);
		setError(null);

		try {
			await handleSignInWithOTP(app.email, isDevelopment ?? false);

			setStep("first");
		} catch (error) {
			console.error("Error signing in with OTP:", error);
			setError("An error occurred while signing in with OTP.");
		}

		setIsLoading(false);
	};

	const handleGenerateUUID = async () => {
		try {
			const newUUID = await generateUserConnectionKey(app.id);
			setUUID(newUUID);
			setCurrentStep(2);
		} catch (error) {
			console.error("Error generating UUID:", error);
		}
	};

	const handleCardSaved = () => {
		setCardSaved(true);
		setCurrentStep(2);
	};

	const handleEmailChange = (newEmail: string) => {
		app.email = newEmail;
		setShowEmailModal(false);
		setStep("verify");
	};

	const handleSaveCard = () => {
		// Implement the logic for saving the card
		console.log("Card saved");
		setStep("success");

		// Check if redirectUrl is provided and redirect after a short delay
		if (app.redirectUrl) {
			setTimeout(() => {
				window.location.href = app.redirectUrl;
			}, 2000); // 2-second delay before redirect
		}
	};

	const handleVerificationSuccess = () => {
		setStep("payment");
	};

	const handleConnectApp = () => {
		// Implement the logic to connect to app.name
		console.log(`Connecting to ${app.name}`);
	};

	const handleBuyTokens = () => {
		// Implement the logic to buy Hiero Tokens
		console.log("Buying $10 of Hiero Tokens");
	};

	return (
		<div className="min-h-screen flex items-start justify-center p-4 pt-8">
			<Card>
				<CardHeader>
					<Header />
				</CardHeader>
				<CardContent>
					<EmailInfo
						email={app.email}
						onChangeEmail={() => setShowEmailModal(true)}
					/>

					<AnimatePresence mode="wait">
						{step === "first" ? (
							<motion.div
								key="first"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className="flex flex-col h-[400px]"
							>
								<AppInfo name={app.name} avgSpent={6.73} />
								<Button
									className="w-full py-6 text-base font-medium shadow-lg"
									onClick={() => {
										setStep("verify");
									}}
									disabled={isLoading}
								>
									Connect It
								</Button>
							</motion.div>
						) : step === "verify" ? (
							<motion.div
								key="verify"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className="flex flex-col h-[400px]"
							>
								<SignInComponent
									email={app.email}
									onVerificationSuccess={handleVerificationSuccess}
									isDevelopment={isDevelopment ?? false}
								/>
							</motion.div>
						) : step === "payment" ? (
							<motion.div
								key="payment"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<PaymentComponent
									onSave={handleSaveCard}
									isTest={isDevelopment ?? false}
								/>
							</motion.div>
						) : (
							<motion.div
								key="success"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								className="flex flex-col items-center"
							>
								<h2 className="text-2xl text-black font-bold mb-4">
									Hiero Account Created
								</h2>
								<p className="text-sm text-gray-600 mb-6">
									Your card has been saved successfully.
								</p>
								<div>Do you want too</div>
								<div className="flex flex-col w-full gap-4 mt-4">
									<Button onClick={handleConnectApp} className="w-full">
										Connect to {app.name}
									</Button>
									<Button
										onClick={handleBuyTokens}
										variant="outline"
										className="w-full"
									>
										Buy $10 of Hiero Tokens for an extra 3 months of usage
									</Button>
								</div>
								{app.redirectUrl && (
									<p className="text-sm text-gray-600 mt-4">
										You will be redirected in a moment...
									</p>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</CardContent>
			</Card>

			<EmailChangeModal
				isOpen={showEmailModal}
				onClose={() => setShowEmailModal(false)}
				onEmailChange={handleEmailChange}
				isDevelopment={isDevelopment ?? false}
			/>
		</div>
	);
}
