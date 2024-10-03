"use client";

import { useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";

export default function CardElementForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const result = await stripe.confirmSetup({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/protected/save-card-success`,
			},
		});

		if (result.error) {
			setError(result.error.message || "An error occurred");
			setSuccess(false);
		} else {
			setError(null);
			setSuccess(true);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			{error && <div className="text-red-500 mt-2">{error}</div>}
			{success && (
				<div className="text-green-500 mt-2">Card saved successfully!</div>
			)}
			<button
				type="submit"
				disabled={!stripe}
				className="bg-green-500 text-white px-4 py-2 rounded mt-4"
			>
				Save Card
			</button>
		</form>
	);
}
