import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "@/lib/password";
import { getUserFromDb, getUserFromDbAndVerifyPassword } from "@/lib/db";
import { signInSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/sign-in",
		newUser: "/sign-up",
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
				const { email, password } = await signInSchema.parseAsync(credentials);

				// logic to verify if the user exists
				user = await getUserFromDbAndVerifyPassword(email, password);
				console.log("user", user);

				if (!user) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error("User not found.");
				}

				// return user object with their profile data
				return user;
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth, request }) => {
			const isLoggedIn = !!auth;
			const isOnProtectedPath =
				request.nextUrl.pathname.startsWith("/protected");
			if (isOnProtectedPath) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				if (request.nextUrl.pathname === "/") {
					// We're logged in and on the home page
					return NextResponse.redirect(
						new URL("/protected/dashboard/developer", request.nextUrl)
					);
				}
			}
			// Otherwise authorize it
			return true;
		},
	},
});
