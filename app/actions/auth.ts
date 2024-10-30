"use server";

import { signIn, signOut } from "@/auth";
import { createUser, updateUserPassword } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/password";
import { signInSchema } from "@/lib/zod";

import { encodedRedirect } from "@/utils/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const next = formData.get("next") as string;
	const origin = (await headers()).get("origin");

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/protected/dashboard/developer",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			console.log("AuthError:", error.type);
			switch (error.type) {
				case "CredentialsSignin":
					return encodedRedirect("error", "/sign-in", "Invalid credentials");
				default:
					return encodedRedirect("error", "/sign-in", "Something went wrong");
			}
		}
		throw error;
	}

	if (next) {
		return redirect(decodeURIComponent(next));
	}

	//return redirect(decodeURIComponent(next) || "/protected");
};

export const signUpAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const next = formData.get("next") as string;
	const origin = (await headers()).get("origin");

	try {
		const { email, password } = await signInSchema.parseAsync({
			email: formData.get("email")?.toString(),
			password: formData.get("password")?.toString(),
		});

		if (!email || !password) {
			return { error: "Email and password are required" };
		}

		// Create the user in the database
		const pwHash = saltAndHashPassword(password);
		await createUser(email, pwHash, "user");

		await signIn("credentials", {
			email,
			password,
			redirectTo: "/protected/dashboard/developer",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return encodedRedirect("error", "/sign-up", "Invalid credentials");
				default:
					return encodedRedirect("error", "/sign-up", "Something went wrong");
			}
		}
		if (error instanceof Error) {
			if (error.message.includes("duplicate")) {
				return encodedRedirect("error", "/sign-up", "User already exists");
			}
			return encodedRedirect("error", "/sign-up", "Something went wrong");
		}
		throw error;
	}
	if (next) {
		return redirect(decodeURIComponent(next));
	}
};

export const forgotPasswordAction = async (formData: FormData) => {
	// Not implemented
	return encodedRedirect("error", "/forgot-password", "Not implemented");
};

export const resetPasswordAction = async (formData: FormData) => {
	// Not implemented
	return encodedRedirect("error", "/reset-password", "Not implemented");
};

export const signOutAction = async () => {
	await signOut({ redirectTo: "/sign-in" });
};

export const signInWithGitHub = async () => {
	const origin = (await headers()).get("origin");

	try {
		await signIn("github", {
			options: {
				redirectTo: `${origin}/auth/callback`,
			},
		});
	} catch (error) {
		console.error("Error signing in with GitHub:", error);
		return encodedRedirect(
			"error",
			"/sign-in",
			"Could not sign in with GitHub"
		);
	}
};

export const signInWithGoogleAuth = async (next?: string) => {
	const origin = (await headers()).get("origin");
	const isLocalEnv = process.env.NODE_ENV === "development";

	const baseRedirectUrl = isLocalEnv
		? `${origin}/auth/callback`
		: "https://hiero.gl/auth/callback";
	const redirectTo = `${baseRedirectUrl}${next ? `?next=${encodeURIComponent(next)}` : ""}`;

	try {
		await signIn("google", {
			options: {
				redirectTo,
			},
		});
	} catch (error) {
		console.error("Error signing in with Google:", error);
		return encodedRedirect(
			"error",
			"/sign-in",
			"Could not sign in with Google"
		);
	}
};

export const handleSendOtp = async (phoneNumber: string) => {
	// Not implemented
	/*
	const supabase = createClient();

	try {
		const { error } = await signInWithOtp({
			phone: phoneNumber,
		});

		if (error) throw error;

		return { success: true, message: "OTP sent successfully" };
	} catch (error) {
		console.error("Error sending OTP:", error);
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to send OTP. Please try again.",
		};
	}
		*/
};

export const handleVerifyOtp = async (phoneNumber: string, otp: string) => {
	// Not implemented
	/*
	const supabase = createClient();

	try {
		const { error } = await supabase.auth.verifyOtp({
			phone: phoneNumber,
			token: otp,
			type: "sms",
		});

		if (error) throw error;

		return { success: true, message: "Phone number verified successfully" };
	} catch (error) {
		console.error("Error verifying OTP:", error);
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to verify OTP. Please try again.",
		};
	}
		*/
};

export const handleSignInWithOTP = async (
	email: string,
	isDevelopment: boolean
) => {
	// Not implemented
	/*
	if (isDevelopment) {
		console.log("Development mode: Simulating OTP sign-in for", email);

		// Simulate a 1-second loading time
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return { success: true, message: "OTP sent successfully" };
	}

	const supabase = createClient();

	try {
		const { error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				shouldCreateUser: true,
			},
		});

		if (error) throw error;

		return { success: true, message: "OTP sent successfully" };
	} catch (err) {
		console.error("Error sending OTP:", err);
		return {
			success: false,
			message: "Failed to send verification code. Please try again.",
		};
	}
	*/
};

export const handleVerifyOTP = async (
	email: string,
	otp: string,
	isDevelopment: boolean
) => {
	// Not implemented
	/*
	if (isDevelopment) {
		console.log("Development mode: Simulating OTP verification");
		return { success: true, message: "OTP verified successfully" };
	}

	const supabase = createClient();

	try {
		const { error } = await supabase.auth.verifyOtp({
			email: email,
			token: otp,
			type: "email",
		});

		if (error) throw error;

		return { success: true, message: "OTP verified successfully" };
	} catch (err) {
		console.error("Error verifying OTP:", err);
		return {
			success: false,
			message: "Invalid verification code. Please try again.",
		};
	}
*/
};
