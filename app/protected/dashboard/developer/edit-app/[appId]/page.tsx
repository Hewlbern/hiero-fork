"use client";

import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { AppForm } from "@/components/app-form";
import { App } from "@/types/supabase";
import { redirect } from "next/navigation";

interface EditAppPageProps {
	params: { appId: string };
}

export default async function EditAppPage({ params }: EditAppPageProps) {
	const router = useRouter();
	const supabase = createClient();
	const { data: app, error } = await supabase
		.from("apps")
		.select("*")
		.eq("id", params.appId)
		.single();

	if (error || !app) {
		return <div>Error loading app data</div>;
	}

	const handleAppUpdated = (updatedApp: App) => {
		// Optionally, add a toast notification here
		router.push("/protected/dashboard/developer");
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<div className="max-w-2xl mx-auto p-8">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">Edit App</h1>
			<AppForm
				mode="edit"
				app={app}
				onAppCreated={handleAppUpdated}
				onCancel={handleCancel}
			/>
		</div>
	);
}
