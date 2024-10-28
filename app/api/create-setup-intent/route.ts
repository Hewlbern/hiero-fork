import { getServerInfo } from "@/lib/getServerInfo";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-09-30.acacia",
});

export async function POST() {
	const { protocol, host } = await getServerInfo();
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "setup",
			success_url: `${protocol}//${host}/protected/save-card-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${protocol}//${host}/protected/save-card`,
		});

		return NextResponse.json({ sessionId: session.id });
	} catch (error) {
		console.error("Error creating Checkout Session:", error);
		return NextResponse.json(
			{ error: "Unable to create Checkout Session" },
			{ status: 500 }
		);
	}
}
