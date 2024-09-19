import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
	const developerApiKey = request.headers.get("x-developer-api-key") || "";
	const userConnectionKey = request.headers.get("x-user-connection-key") || "";
	const supabase = createClient({ developerApiKey, userConnectionKey });

	let { data, error } = await supabase.rpc("get_user_id_from_connection_keys", {
		p_developer_api_key: developerApiKey,
		p_user_connection_key: userConnectionKey,
	});
	if (error) console.error(error);
	else console.log(data);

	/*
	// If not using SQL permissions... do it this way. The user should only have permission to see the balance of the user with this key combo
	
	if (!developerApiKey || !userConnectionKey) {
		return NextResponse.json(
			{ error: "Both Developer API Key and User Connection Key are required" },
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

	// Verify user connection key
	const userVerification = await verifyUserConnectionKey(
		supabase,
		userConnectionKey,
		developerVerification.app_id
	);
	if (!userVerification) {
		return NextResponse.json(
			{ error: "Invalid user connection key" },
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
