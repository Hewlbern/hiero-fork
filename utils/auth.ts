import { SupabaseClient } from "@supabase/supabase-js";

// Types for the returned data
type DeveloperApiKeyData = {
	id: string;
	app_id: string;
	developer_id: string;
};

// Rename type
type UserConnectionKeyData = {
	id: string;
	user_id: string;
	app_id: string;
};

export async function verifyDeveloperApiKey(
	supabase: SupabaseClient,
	apiKey: string
): Promise<DeveloperApiKeyData | null> {
	const { data, error } = await supabase
		.from("developer_api_keys")
		.select("id, app_id")
		.eq("key", apiKey)
		.single();

	if (error || !data) {
		return null;
	}

	return data as DeveloperApiKeyData;
}

// Rename function
export async function verifyUserConnectionKey(
	supabase: SupabaseClient,
	connectionKey: string,
	appId: string
): Promise<UserConnectionKeyData | null> {
	const { data, error } = await supabase
		.from("user_connection_keys")
		.select("id, user_id, app_id")
		.eq("key", connectionKey)
		.eq("app_id", appId)
		.single();

	if (error || !data) {
		return null;
	}

	return data as UserConnectionKeyData;
}
