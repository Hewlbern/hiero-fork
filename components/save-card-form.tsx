"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./ui/button";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function SaveCardForm() {
	const [isLoading, setIsLoading] = useState(false);

	const handleSaveCard = async () => {
		setIsLoading(true);
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
	};

	return (
		<div>
			<Button
				onClick={handleSaveCard}
				disabled={isLoading}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				{isLoading ? "Processing..." : "Save a new card"}
			</Button>
		</div>
	);
}
