import { SupabaseClient } from "@supabase/supabase-js";

import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
	type: "error" | "success",
	path: string,
	message: string
) {
	return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

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
