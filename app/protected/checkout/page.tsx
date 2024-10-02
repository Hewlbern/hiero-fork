"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";

export default function CheckoutPage() {
	const [uuid, setUUID] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const supabase = createClient();

	const handleOptionSelect = async (planId: string) => {
		const { data: { user } } = await supabase.auth.getUser();

		if (!user) {
			setError("Please sign in to select a plan.");
			router.push("/sign-in");
			return;
		}

		try {
			const newUUID = await generateUserConnectionKey(planId);
			setUUID(newUUID);
			setError(null);
		} catch (error) {
			console.error("Error generating UUID:", error);
			setError("Failed to generate UUID. Please try again.");
		}
	};

	return (
		<div className="flex flex-col gap-4 w-full">
			<h1 className="text-2xl font-bold mb-4">Choose a Payment Option</h1>
			{error && <p className="text-red-500">{error}</p>}
			{uuid && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
					<strong className="font-bold">Success!</strong>
					<span className="block sm:inline"> Your UUID has been generated: {uuid}</span>
				</div>
			)}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
				<Card>
					<CardHeader>
						<CardTitle>Monthly Plan</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">$9.99/month</p>
						<p className="mt-2">Access to all features</p>
						<button 
							className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
							onClick={() => handleOptionSelect("monthly")}
						>
							Select
						</button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Annual Plan</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">$99.99/year</p>
						<p className="mt-2">Save 17% compared to monthly</p>
						<button 
							className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
							onClick={() => handleOptionSelect("annual")}
						>
							Select
						</button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Pay As You Go</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">$0.10 per API call</p>
						<p className="mt-2">Perfect for low volume usage</p>
						<button 
							className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
							onClick={() => handleOptionSelect("pay-as-you-go")}
						>
							Select
						</button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
