"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function editApp(
	appId: string,
	{ name, description, url }: { name: string; description: string; url: string }
) {
	const supabase = createClient();

	// Validate URL
	try {
		new URL(url);
	} catch (_) {
		return { error: "Invalid URL" };
	}

	const { data, error } = await supabase
		.from("apps")
		.update({ name, description, url })
		.eq("id", appId)
		.select()
		.single();

	if (error) {
		console.error("Error updating app:", error);
		return { error: "Failed to update app" };
	}

	revalidatePath("/protected/developers");
	return { success: true, app: data };
}
