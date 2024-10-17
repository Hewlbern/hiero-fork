// Remove "use client"; to convert to a server component
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createApiKey } from "@/app/actions/api-keys";
import { useToast } from "@/hooks/use-toast";
import { App } from "@/types/supabase";
import { AppForm } from "./app-form";
// Import MDX files
import IntegrateTokenDeduction from "@/app/code-snippets/integrate-token-deduction.mdx";
import ImplementWebhook from "@/app/code-snippets/implement-webhook.mdx";
import LaunchPayWithHiero from "@/app/code-snippets/launch-pay-with-hiero.mdx";
import CodePre from "./code-pre";
import CodeBlock from "./code-block";

export type Step = {
	title: string;
	description: string;
	CodeSnippetComponent?: React.ComponentType;
};
const steps: Step[] = [
	{
		title: "Create an App & API Key",
		description: "Let's start by creating your app in Hiero.",
	},
	{
		title: "Integrate Hiero token deduction",
		description: "Here's how to integrate Hiero token deduction into your app:",
		CodeSnippetComponent: IntegrateTokenDeduction,
	},
	{
		title: "Implement connection Web Hook",
		description: "Set up a webhook to handle user connections:",
		CodeSnippetComponent: ImplementWebhook,
	},
	{
		title: "Launch Pay with Hiero",
		description: "Add the 'Pay with Hiero' button to your app:",
		CodeSnippetComponent: LaunchPayWithHiero,
	},
];
interface OnboardingFlowProps {
	onComplete: () => void;
}
export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [appId, setAppId] = useState<string | null>(null);
	const [apiKey, setApiKey] = useState("");
	const { toast } = useToast();
	const handleNext = async () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onComplete();
		}
	};
	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};
	const handleAppCreated = async (app: App) => {
		setAppId(app?.id);
		if (app?.id) {
			toast({
				title: "App created",
				description: "Your app has been created.",
				variant: "default",
			});
		} else {
			toast({
				title: "Error",
				description: "Failed to create app. Please try again.",
				variant: "destructive",
			});
		}
		try {
			const apiKeyResult = await createApiKey(app.id || "");
			if (apiKeyResult.success && apiKeyResult.apiKey) {
				setApiKey(apiKeyResult.apiKey.key);
			}
			handleNext();
		} catch (error) {
			console.error("Error creating app or API key:", error);
			toast({
				title: "Error",
				description: "Failed to create API Key.",
				variant: "destructive",
			});
		}
	};
	const currentStepData = steps[currentStep];
	return (
		<div className="max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">{currentStepData.title}</h2>
			<p className="mb-6 text-gray-600">{currentStepData.description}</p>
			{currentStep === 0 && (
				<AppForm
					mode="create"
					onAppCreated={(app: App) => {
						handleAppCreated(app);
					}}
				/>
			)}
			{currentStepData.CodeSnippetComponent && (
				<currentStepData.CodeSnippetComponent />
			)}
			{currentStep === 1 && apiKey && (
				<div className="mb-4 p-4 bg-green-100 rounded-md">
					<p className="font-bold">Your API Key:</p>
					<CodeBlock language="bash">{apiKey}</CodeBlock>
					<p className="mt-2 text-sm text-gray-600">
						Keep this key secret and don&apos;t share it with anyone!
					</p>
				</div>
			)}
			{currentStep > 0 && (
				<div className="flex justify-between mt-8">
					<Button onClick={handleBack} disabled={currentStep === 0}>
						Back
					</Button>
					<Button onClick={handleNext} disabled={!appId}>
						{currentStep === steps.length - 1 ? "Finish" : "Next"}
					</Button>
				</div>
			)}
		</div>
	);
}
