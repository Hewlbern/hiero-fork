"use server";

import { createClient } from "@/utils/supabase/server";

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
