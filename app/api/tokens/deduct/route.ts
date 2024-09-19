import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { verifyDeveloperApiKey, verifyUserConnectionKey } from "@/utils/auth";

export async function POST(request: NextRequest) {
	const {
		amount,
		multiplier = 1.0,
		model = "",
		label = "",
	} = await request.json();
	const developerApiKey = request.headers.get("X-Developer-API-Key") || "";
	const userConnectionKey = request.headers.get("X-User-Connection-Key") || "";

	const supabase = createClient({ developerApiKey, userConnectionKey });

	console.log("developerApiKey", developerApiKey);
	console.log("userConnectionKey", userConnectionKey);

	if (!developerApiKey || !userConnectionKey) {
		return NextResponse.json(
			{ error: "Both Developer API Key and User Connection Key are required" },
			{ status: 400 }
		);
	}

	try {
		// Verify the developer API key
		const developerData = await verifyDeveloperApiKey(
			supabase,
			developerApiKey
		);
		if (!developerData) {
			return NextResponse.json(
				{ error: "Invalid Developer API Key" },
				{ status: 401 }
			);
		}

		// Verify the user connection key and check if it's associated with the developer's app
		const userData = await verifyUserConnectionKey(
			supabase,
			userConnectionKey,
			developerData.app_id
		);
		if (!userData) {
			return NextResponse.json(
				{ error: "Invalid User Connection Key" },
				{ status: 401 }
			);
		}

		const user = { id: userData.user_id };

		if (!amount || typeof amount !== "number" || amount <= 0) {
			return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
		}

		const adjustedAmount = Math.round(amount * multiplier);
		const { data, error } = await supabase.rpc("deduct_tokens_and_audit", {
			p_user_connection_key: userConnectionKey,
			p_developer_api_key: developerApiKey,
			p_amount: adjustedAmount,
			p_original_amount: amount,
			p_multiplier: multiplier,
			p_model: model,
			p_label: label,
		});
		console.log(" data and error", data, error);
		if (error) throw error;

		const [result] = data;

		if (!result.success) {
			return NextResponse.json({ error: result.message }, { status: 400 });
		}

		return NextResponse.json({
			success: true,
			newBalance: result.new_balance,
			message: result.message,
			deductedAmount: adjustedAmount,
		});
	} catch (error) {
		console.error("Error deducting tokens:", error);
		return NextResponse.json(
			{ error: "Failed to deduct tokens" },
			{ status: 500 }
		);
	}
}
