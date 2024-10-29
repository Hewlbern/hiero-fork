"use server";

import { auth } from "@/auth";
import { createClient } from "@/utils/supabase/server";

export async function generateUserConnectionKey(
	appId: string
): Promise<string> {
	const supabase = createClient();
	const session = await auth();
	const user = session?.user;

	const { data, error } = await supabase
		.from("user_connection_keys")
		.insert({
			app_id: appId,
			user_id: user?.id,
		})
		.select()
		.single();

	if (error) {
		console.error("Error generating user connection key:", error);
		throw new Error("Failed to generate user connection key");
	}

	return data?.key;
}
