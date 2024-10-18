"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface SaveCardButtonProps {
	onSave?: () => void;
	isTest?: boolean;
}

export default function SaveCardForm({
	onSave,
	isTest = false,
}: SaveCardButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleSaveCard = async () => {
		setIsLoading(true);

		if (isTest) {
			// Simulate a successful save for testing
			setTimeout(() => {
				setIsLoading(false);
				onSave?.();
			}, 1000);
			return;
		}

		const stripe = await stripePromise;

		const response = await fetch("/api/create-setup-intent", {
			method: "POST",
		});
		const { sessionId } = await response.json();

		const { error } = await stripe!.redirectToCheckout({ sessionId });

		if (error) {
			console.error("Error:", error);
		}
		setIsLoading(false);
		onSave?.();
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<h2 className="text-2xl text-black font-bold mb-4">Save Your Card</h2>
			<p className="text-sm text-gray-600 mb-6">
				Save your card for future purchases.
				<br />
				<strong className="text-black">
					Your card will not be charged now.
				</strong>
			</p>
			<p className="text-sm text-gray-600 mb-6">
				Normally 1 million tokens cost:
				<br />
				• $15 per month
				<br />• $18 for a one-time payment (plus tax)
			</p>
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<Button
					className="w-full py-6 text-base font-medium shadow-lg"
					onClick={handleSaveCard}
					disabled={isLoading}
				>
					<span>{isLoading ? "Processing..." : "Save Card"}</span>
				</Button>
			</motion.div>
		</div>
	);
}
