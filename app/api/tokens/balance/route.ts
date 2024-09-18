import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { verifyDeveloperApiKey, verifyUserApiKey } from "@/utils/auth";

export async function GET(request: NextRequest) {
	const supabase = createClient();
	const developerApiKey = request.headers.get("x-developer-api-key");
	const userApiKey = request.headers.get("x-user-api-key");

	if (!developerApiKey || !userApiKey) {
		return NextResponse.json(
			{ error: "Both Developer API Key and User API Key are required" },
			{ status: 400 }
		);
	}

	// Verify developer API key
	const developerVerification = await verifyDeveloperApiKey(
		supabase,
		developerApiKey
	);
	if (!developerVerification) {
		return NextResponse.json(
			{ error: "Invalid developer API key" },
			{ status: 401 }
		);
	}

	// Verify user API key
	const userVerification = await verifyUserApiKey(
		supabase,
		userApiKey,
		developerVerification.app_id
	);
	if (!userVerification) {
		return NextResponse.json(
			{ error: "Invalid user API key" },
			{ status: 401 }
		);
	}

	// Fetch the user's token balance
	const { data, error } = await supabase
		.from("user_tokens")
		.select("token_balance")
		.eq("user_id", userVerification.user_id)
		.single();

	if (error) {
		console.error("Error fetching token balance", error);
		return NextResponse.json(
			{ error: "Error fetching token balance" },
			{ status: 500 }
		);
	}

	return NextResponse.json({ balance: data.token_balance });
}
