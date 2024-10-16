import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import OnboardingFlowClient from "./onboarding-flow-client";

export type Step = {
	title: string;
	description: string;
	fields?: Array<{ name: string; label: string; type: string }>;
	codeSnippet?: string;
};

const steps: Step[] = [
	{
		title: "Welcome to Hiero!",
		description:
			"Let's get you set up with Hiero. We'll guide you through the process step by step.",
	},
	{
		title: "Create Your App",
		description: "First, let's create your app in Hiero.",
		fields: [
			{ name: "name", label: "App Name", type: "input" },
			{ name: "description", label: "App Description", type: "textarea" },
			{ name: "url", label: "App URL", type: "input" },
			{ name: "slug", label: "App Slug", type: "input" },
			{ name: "webhook_url", label: "Webhook URL", type: "input" },
		],
	},
	{
		title: "Generate API Key",
		description:
			"Now, let's generate an API key for your app. This key will be used to authenticate your requests.",
	},
	{
		title: "Integrate Token Deduction",
		description:
			"Next, you'll need to integrate Hiero token deduction into your app. Here's a code snippet to help you get started:",
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
		title: "Set Up Webhook",
		description:
			"To handle user connections, you need to set up a webhook. Enter your webhook URL below:",
		fields: [{ name: "webhookUrl", label: "Webhook URL", type: "input" }],
	},
	{
		title: "Implement Pay with Hiero",
		description:
			"Finally, let's add the 'Pay with Hiero' button to your app. Here's the code to include:",
		codeSnippet: `
<Link href="https://hiero.gl/a/\${appSlug}">
  <Button>Pay with Hiero</Button>
</Link>
		`,
	},
];

export function OnboardingFlow() {
	return <OnboardingFlowClient steps={steps} />;
}
