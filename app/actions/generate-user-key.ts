"use server";

import { createClient } from "@/utils/supabase/server";

export async function generateUserKey(appId: string): Promise<string> {
	const supabase = createClient();

	console.log("Generating user key for appId:", appId);
	const { data, error } = await supabase
		.from("user_api_keys")
		.insert({
			app_id: appId,
		})
		.select()
		.single();

	if (error) {
		console.error("Error generating user key:", error);
		throw new Error("Failed to generate user key");
	}

	return data?.key;
}
