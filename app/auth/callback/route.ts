import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/";


	if (code) {
		const supabase = createClient();
		console.log("Exchanging code for session");
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			console.log("Session exchange successful");
			const forwardedHost = request.headers.get("x-forwarded-host");
			const isLocalEnv = process.env.NODE_ENV === "development";
			
			let redirectUrl;
			if (isLocalEnv) {
				redirectUrl = `${origin}${next}`;
			} else if (forwardedHost) {
				redirectUrl = `https://${forwardedHost}${next}`;
			} else {
				redirectUrl = `${origin}${next}`;
			}

			return NextResponse.redirect(redirectUrl);
		} else {
			console.error("Session exchange error:", error);
		}
	} else {
		console.log("No code provided in callback");
	}

	// return the user to an error page with instructions
	console.log("Redirecting to error page");
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
