import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
	const developerApiKey = request.headers.get("x-developer-api-key") || "";
	const userApiKey = request.headers.get("x-user-api-key") || "";
	const supabase = createClient({ developerApiKey, userApiKey });

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
