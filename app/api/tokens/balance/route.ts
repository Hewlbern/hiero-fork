import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
	const developerApiKey = request.headers.get("x-developer-api-key") || "";
	const userApiKey = request.headers.get("x-user-api-key") || "";
	const supabase = createClient({ developerApiKey, userApiKey });

	let { data, error } = await supabase.rpc("get_user_id_from_api_keys", {
		p_developer_api_key: developerApiKey,
		p_user_api_key: userApiKey,
	});
	if (error) console.error(error);
	else console.log(data);

	/*
	// If not using SQL permissions... do it this way. The user should only have permission to see the balance of the user with this key combo
	
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

	*/

	// Now that we have verified the user, fetch the token balance
	const { data: tokenData, error: tokenError } = await supabase
		.from("user_tokens")
		.select("token_balance")
		.single();

	if (tokenError) {
		console.error("Error fetching token balance", tokenError);
		return NextResponse.json({ error: tokenError.message }, { status: 500 });
	}

	if (!tokenData) {
		return NextResponse.json(
			{ error: "Token balance not found" },
			{ status: 404 }
		);
	}

	return NextResponse.json({ balance: tokenData.token_balance });
}
