import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
	// This `try/catch` block is only here for the interactive tutorial.
	// Feel free to remove once you have Supabase connected.
	try {
		// Create an unmodified response
		let response = NextResponse.next({
			request: {
				headers: request.headers,
			},
		});

		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					getAll() {
						return request.cookies.getAll();
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value }) =>
							request.cookies.set(name, value)
						);
						response = NextResponse.next({
							request,
						});
						cookiesToSet.forEach(({ name, value, options }) =>
							response.cookies.set(name, value, options)
						);
					},
				},
			}
		);

		// This will refresh session if expired - required for Server Components
		// https://supabase.com/docs/guides/auth/server-side/nextjs
		const user = await supabase.auth.getUser();

		if (user.error) {
			// Not signed in
			if (!request.nextUrl.pathname.startsWith("/sign")) {
				// If it's not a sign-in or sign-up page, and it's not a public app page, redirect to sign-in
				// Note this currently also directs the main commercial page to sign in
				return NextResponse.redirect(new URL("/sign-in", request.url));
			}
		} else {
			// Signed in
			if (
				request.nextUrl.pathname.startsWith("/sign") ||
				request.nextUrl.pathname === "/"
			) {
				// If it's not a sign-in or sign-up page, and it's not a public app page, redirect to sign-in
				return NextResponse.redirect(
					new URL("/protected/dashboard", request.url)
				);
			}
		}

		if (request.nextUrl.pathname === "/protected") {
			return NextResponse.redirect(
				new URL("/protected/dashboard", request.url)
			);
		}
		return response;
	} catch (e) {
		console.log("middleware error", e);
		// If you are here, a Supabase client could not be created!
		// This is likely because you have not set up environment variables.
		// Check out http://localhost:3000 for Next Steps.
		return NextResponse.next({
			request: {
				headers: request.headers,
			},
		});
	}
};
