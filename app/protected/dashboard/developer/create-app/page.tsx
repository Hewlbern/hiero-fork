"use client";

import { createApiKey } from "@/app/actions/api-keys";
import { AppForm } from "@/components/app-form";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { toast } from "@/hooks/use-toast";
import { App } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAppPage() {
	const router = useRouter();
	const [appId, setAppId] = useState<string | null>(null);
	const [apiKey, setApiKey] = useState("");

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

		router.push(`/protected/dashboard/developer/api-keys/${app?.id}`);
	};

	return (
		<div className="max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Create a New App</h2>
			<p className="mb-6 text-gray-600">Create an app to get started.</p>
			<AppForm
				mode="create"
				onAppCreated={(app: App) => {
					handleAppCreated(app);
				}}
			/>
		</div>
	);
}
