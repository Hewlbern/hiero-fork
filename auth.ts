import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDbAndVerifyPassword } from "@/lib/db";
import { signInSchema } from "@/lib/zod";
import { NextResponse } from "next/server";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log("supabaseUrl", supabaseUrl);
console.log("supabaseServiceRoleKey", supabaseServiceRoleKey);

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: true,
	pages: {
		signIn: "/sign-in",
		newUser: "/sign-up",
	},
	session: {
		// Setting to JWT strategy so that credentials are stored in the JWT token
		strategy: "jwt",
	},
	providers: [
		GitHub,
		Google,
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;
				try {
					const { email, password } =
						await signInSchema.parseAsync(credentials);

					// logic to verify if the user exists
					user = await getUserFromDbAndVerifyPassword(email, password);
					console.log("user in authorize", user);
					// return user object with their profile data
				} catch (error) {
					console.error("Error in authorize:", error);
				}
				return user;
			},
		}),
	],
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
		secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
	}),
	callbacks: {
		authorized: async ({ auth, request }) => {
			const isLoggedIn = !!auth;
			const isOnProtectedPath =
				request.nextUrl.pathname.startsWith("/protected");

			if (isOnProtectedPath) {
				if (isLoggedIn) return true;
				// Redirect unauthenticated users to login page
				return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
			} else if (isLoggedIn) {
				if (
					request.nextUrl.pathname === "/" ||
					request.nextUrl.pathname === "/sign-in" ||
					request.nextUrl.pathname === "/sign-up"
				) {
					// We're logged in and on the home page
					return NextResponse.redirect(
						new URL("/protected/dashboard/developer", request.nextUrl)
					);
				}
			}
			if (
				request.nextUrl.pathname === "/sign-in" ||
				request.nextUrl.pathname === "/sign-up" ||
				request.nextUrl.pathname === "/forgot-password"
			) {
				// Explicitly allow access to sign-in, sign-up, and forgot-password pages
				return NextResponse.next();
			}

			// Otherwise authorized
			// TODO:
			return NextResponse.next();
		},
		async jwt({ token, user }) {
			// If user is defined, we're signing in
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			console.log("session", session);
			console.log("token", token);
			if (token && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
});
