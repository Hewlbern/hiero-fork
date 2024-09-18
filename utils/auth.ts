import { SupabaseClient } from "@supabase/supabase-js";

// Types for the returned data
type DeveloperApiKeyData = {
	id: string;
	app_id: string;
	developer_id: string;
};

type UserApiKeyData = {
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
		.select("id, app_id, developer_id")
		.eq("key", apiKey)
		.single();

	console.log("data", data);
	console.log("error", error);

	if (error || !data) {
		return null;
	}

	return data as DeveloperApiKeyData;
}

export async function verifyUserApiKey(
	supabase: SupabaseClient,
	apiKey: string,
	appId: string
): Promise<UserApiKeyData | null> {
	const { data, error } = await supabase
		.from("user_api_keys")
		.select("id, user_id, app_id")
		.eq("key", apiKey)
		.eq("app_id", appId)
		.single();

	if (error || !data) {
		return null;
	}

	return data as UserApiKeyData;
}
