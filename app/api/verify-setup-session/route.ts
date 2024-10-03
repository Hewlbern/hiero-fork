import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-09-30.acacia",
});

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const sessionId = searchParams.get("session_id");

	if (!sessionId) {
		return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
	}

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.setup_intent) {
			const setupIntent = await stripe.setupIntents.retrieve(
				session.setup_intent as string
			);

			if (setupIntent.status === "succeeded") {
				// Here you might want to save the payment method to your database
				return NextResponse.json({ success: true });
			}
		}

		return NextResponse.json({ success: false });
	} catch (error) {
		console.error("Error verifying setup session:", error);
		return NextResponse.json(
			{ error: "Unable to verify setup session" },
			{ status: 500 }
		);
	}
}
