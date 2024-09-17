"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createApp({
	name,
	url,
	description,
}: {
	name: string;
	url: string;
	description: string;
}) {
	const supabase = createClient();

	if (!name || !url || !description) {
		return { error: "Missing required fields" };
	}

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { error: "User not authenticated" };
	}

	const { data, error } = await supabase
		.from("apps")
		.insert({
			name,
			url,
			description,
			user_id: user.id,
		})
		.select()
		.single();

	if (error) {
		console.error("Error creating app:", error);
		return { error: "Failed to create app" };
	}

	revalidatePath("/protected/developers");
	return { success: true, app: data };
}
