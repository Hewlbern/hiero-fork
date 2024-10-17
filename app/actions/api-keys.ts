"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createApiKey(appId: string) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("developer_api_keys")
		.insert({ app_id: appId })
		.select("id, key")
		.single();

	if (error) {
		console.error("Error creating API key:", error);
		return { error: "Failed to create API key" };
	}

	return { success: true, apiKey: data };
}

export async function deleteApiKey(keyId: string) {
	const supabase = createClient();

	const { error } = await supabase
		.from("developer_api_keys")
		.delete()
		.match({ id: keyId });

	if (error) {
		console.error("Error deleting API key:", error);
		return { error: "Failed to delete API key" };
	}

	return { success: true };
}

export async function fetchApiKeys(appId: string) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("developer_api_keys")
		.select("id, key")
		.eq("app_id", appId);

	if (error) {
		console.error("Error fetching API keys:", error);
		return { success: false, error: "Failed to fetch API keys" };
	}

	return {
		success: true,
		apiKeys: data.map((item) => ({
			id: item.id,
			masked_key: maskApiKey(item.key),
		})),
	};
}
function maskApiKey(key: string) {
	return `${key.slice(0, 4)}${"*".repeat(key.length - 8)}${key.slice(-4)}`;
}

export async function generateApiKey(appId: string) {
	// Implementation here
}
