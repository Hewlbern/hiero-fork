"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createApp } from "@/app/actions/apps";
import { createApiKey } from "@/app/actions/api-keys";
import { useToast } from "@/hooks/use-toast";

export type Step = {
	title: string;
	description: string;
	fields?: Array<{ name: string; label: string; type: string }>;
	codeSnippet?: string;
};

const steps: Step[] = [
	{
		title: "Create an App & API Key",
		description: "Let's start by creating your app in Hiero.",
		fields: [
			{ name: "name", label: "App Name", type: "input" },
			{ name: "description", label: "App Description", type: "textarea" },
			{ name: "url", label: "App URL", type: "input" },
			{ name: "slug", label: "App Slug", type: "input" },
		],
	},
	{
		title: "Integrate Hiero token deduction",
		description: "Here's how to integrate Hiero token deduction into your app:",
		codeSnippet: `
const deductTokens = async (userId, tokens, multiplier = 1, unit = null) => {
  const response = await fetch('https://api.hiero.gl/deduct-tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'YOUR_API_KEY_HERE'
    },
    body: JSON.stringify({ userId, tokens, multiplier, unit })
  });
  return response.json();
};
		`,
	},
	{
		title: "Implement connection Web Hook",
		description: "Set up a webhook to handle user connections:",
		fields: [{ name: "webhook_url", label: "Webhook URL", type: "input" }],
	},
	{
		title: "Launch Pay with Hiero",
		description: "Add the 'Pay with Hiero' button to your app:",
		codeSnippet: `
<Link href="https://hiero.gl/a/YOUR_APP_SLUG">
  <Button>Pay with Hiero</Button>
</Link>
		`,
	},
];

interface OnboardingFlowProps {
	onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [appData, setAppData] = useState({
		name: "",
		description: "",
		url: "",
		slug: "",
		webhook_url: "",
	});
	const [apiKey, setApiKey] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const { toast } = useToast();

	const handleNext = async () => {
		setFieldErrors({});
		if (currentStep === 0) {
			try {
				const app = await createApp(appData);
				const apiKeyResult = await createApiKey(app.id);
				if (apiKeyResult.success && apiKeyResult.apiKey) {
					setApiKey(apiKeyResult.apiKey.key);
				} else {
					throw new Error("Failed to create API key");
				}
			} catch (error) {
				console.error("Error creating app or API key:", error);
				toast({
					title: "Error",
					description: "Failed to create app or API key. Please try again.",
					variant: "destructive",
				});
				return;
			}
		}

		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onComplete();
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setAppData({ ...appData, [name]: value });
		if (fieldErrors[name]) {
			setFieldErrors({ ...fieldErrors, [name]: "" });
		}
	};

	const validateFields = () => {
		const errors: Record<string, string> = {};
		steps[currentStep].fields?.forEach((field) => {
			if (!appData[field.name as keyof typeof appData]) {
				errors[field.name] = `${field.label} is required`;
			}
		});
		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const currentStepData = steps[currentStep];

	return (
		<div className="max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">{currentStepData.title}</h2>
			<p className="mb-6 text-gray-600">{currentStepData.description}</p>

			{currentStepData.fields?.map((field) => (
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
							className={fieldErrors[field.name] ? "border-red-500" : ""}
						/>
					) : (
						<Textarea
							id={field.name}
							name={field.name}
							value={appData[field.name as keyof typeof appData]}
							onChange={handleInputChange}
							className={fieldErrors[field.name] ? "border-red-500" : ""}
						/>
					)}
					{fieldErrors[field.name] && (
						<p className="mt-1 text-sm text-red-600">
							{fieldErrors[field.name]}
						</p>
					)}
				</div>
			))}

			{currentStepData.codeSnippet && (
				<pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
					<code>{currentStepData.codeSnippet}</code>
				</pre>
			)}

			{currentStep === 1 && apiKey && (
				<div className="mb-4 p-4 bg-green-100 rounded-md">
					<p className="font-bold">Your API Key:</p>
					<p className="font-mono">{apiKey}</p>
					<p className="mt-2 text-sm text-gray-600">
						Keep this key secret and don't share it with anyone!
					</p>
				</div>
			)}

			<div className="flex justify-between mt-8">
				<Button
					onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
					disabled={currentStep === 0}
				>
					Back
				</Button>
				<Button
					onClick={() => {
						if (validateFields()) {
							handleNext();
						}
					}}
				>
					{currentStep === steps.length - 1 ? "Finish" : "Next"}
				</Button>
			</div>
		</div>
	);
}
