"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createApp } from "@/app/actions/apps";
import { createApiKey } from "@/app/actions/api-keys";
import { Step } from "./onboarding-flow";

type OnboardingFlowClientProps = {
	steps: Step[];
};

export default function OnboardingFlowClient({
	steps,
}: OnboardingFlowClientProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [appData, setAppData] = useState({
		name: "",
		description: "",
		url: "",
		slug: "",
		webhook_url: "",
	});
	const [apiKey, setApiKey] = useState("");

	const handleNext = async () => {
		if (currentStep === 1) {
			try {
				await createApp(appData);
			} catch (error) {
				console.error("Error creating app:", error);
				return;
			}
		} else if (currentStep === 2) {
			try {
				const apiKeyResult = await createApiKey(appData.slug);
				if (apiKeyResult.success && apiKeyResult.apiKey) {
					setApiKey(apiKeyResult.apiKey.key);
				}
			} catch (error) {
				console.error("Error generating API key:", error);
				return;
			}
		}

		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setAppData({ ...appData, [name]: value });
	};

	return (
		<div className="max-w-2xl mx-auto">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentStep}
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -50 }}
					transition={{ duration: 0.3 }}
				>
					<h2 className="text-2xl font-bold mb-4">
						{steps[currentStep].title}
					</h2>
					<p className="mb-6 text-gray-600">{steps[currentStep].description}</p>

					{steps[currentStep].fields?.map((field) => (
						<div key={field.name} className="mb-4">
							<label
								htmlFor={field.name}
								className="block text-sm font-medium text-gray-700"
							>
								{field.label}
							</label>
							{field.type === "input" ? (
								<Input
									id={field.name}
									name={field.name}
									value={appData[field.name as keyof typeof appData]}
									onChange={handleInputChange}
									className="mt-1"
								/>
							) : (
								<Textarea
									id={field.name}
									name={field.name}
									value={appData[field.name as keyof typeof appData]}
									onChange={handleInputChange}
									className="mt-1"
								/>
							)}
						</div>
					))}

					{steps[currentStep].codeSnippet && (
						<pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
							<code>{steps[currentStep].codeSnippet}</code>
						</pre>
					)}

					{currentStep === 2 && apiKey && (
						<div className="mt-4 p-4 bg-green-100 rounded-md">
							<p className="font-bold">Your API Key:</p>
							<p className="font-mono">{apiKey}</p>
							<p className="mt-2 text-sm text-gray-600">
								Keep this key secret and don't share it with anyone!
							</p>
						</div>
					)}

					<div className="flex justify-between mt-8">
						<Button onClick={handleBack} disabled={currentStep === 0}>
							Back
						</Button>
						<Button onClick={handleNext}>
							{currentStep === steps.length - 1 ? "Finish" : "Next"}
						</Button>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
