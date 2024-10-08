import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "028269d1-e177-4938-a71f-81b65cc03515";

export async function POST(request: Request) {
	try {
		const { email, firstName, lastName } = await request.json();

		const { data, error } = await resend.contacts.create({
			email,
			firstName,
			lastName,
			unsubscribed: false,
			audienceId: AUDIENCE_ID,
		});

		if (error) {
			console.error("Resend API error:", error);
			return NextResponse.json(
				{ error: "Failed to create contact" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Contact created successfully", data },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
