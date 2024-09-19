"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function checkSlugAvailability(
	slug: string,
	currentAppId?: string
): Promise<boolean> {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("apps")
		.select("id")
		.eq("slug", slug)
		.is("deleted_at", null)
		.single();

	console.log(data, error);
	if (error && error.code !== "PGRST116") {
		console.error("Error checking slug availability:", error);
		throw new Error("Failed to check slug availability");
	}

	// If no app found with this slug, it's available
	if (!data) return true;

	// If an app is found, it's available only if it's the current app being edited
	return currentAppId ? data.id === currentAppId : false;
}

export async function createApp(appData: {
	name: string;
	url: string;
	description: string;
	slug: string;
}) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const { data, error } = await supabase
		.from("apps")
		.insert({
			...appData,
			user_id: user.id,
			status: "pending",
		})
		.select()
		.single();

	if (error) {
		console.error("Error creating app:", error);
		throw new Error("Failed to create app");
	}

	return data;
}

export async function editApp(
	appId: string,
	appData: {
		name: string;
		url: string;
		description: string;
		slug: string;
	}
) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const { data, error } = await supabase
		.from("apps")
		.update({ ...appData, user_id: user.id })
		.eq("id", appId)
		.select()
		.single();

	if (error) {
		console.error("Error updating app:", error);
		throw new Error("Failed to update app");
	}

	return data;
}

export async function deleteApp(appId: string) {
	const supabase = createClient();

	const { error } = await supabase
		.from("apps")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", appId);

	if (error) {
		throw new Error("Failed to delete app");
	}

	return { success: true };
}