"use client";

import React, { useEffect, useState } from "react";

import { getAppData } from "@/app/actions/apps";
import { App } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { AppForm } from "@/components/app-form";

interface EditAppPageProps {
	params: { appId: string };
}

export default function EditAppPage({ params }: EditAppPageProps) {
	const [app, setApp] = useState<App | null>(null);

	const router = useRouter();

	const handleAppUpdated = (updatedApp: App) => {
		// Optionally, add a toast notification here
		console.log("App updated", updatedApp);
		router.push(`/protected/dashboard/developer`);
	};

	const handleCancel = () => {
		console.log("Cancel");
		router.back();
	};

	const handleAPIKeys = () => {
		console.log("API Keys");
		router.push(`/protected/dashboard/developer/api-keys/${params.appId}`);
	};
	useEffect(() => {
		const fetchApp = async () => {
			const app = await getAppData(params.appId);
			setApp(app);
		};
		fetchApp();
	}, [params.appId]);

	return (
		<div className="max-w-2xl mx-auto p-8">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">Edit App</h1>
			{app && (
				<AppForm
					mode="edit"
					app={app}
					onAppCreated={handleAppUpdated}
					onCancel={handleCancel}
					onAPIKeys={handleAPIKeys}
				/>
			)}
		</div>
	);
}
