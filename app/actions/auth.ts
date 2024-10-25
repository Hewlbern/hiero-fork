"use server";

import { encodedRedirect } from "@/utils/auth";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = createClient();
	const next = formData.get("next") as string;

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message, next);
	}
	return redirect(decodeURIComponent(next) || "/protected");
};

export const signUpAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const next = formData.get("next") as string;

	const supabase = createClient();
	const origin = headers().get("origin");

	if (!email || !password) {
		return { error: "Email and password are required" };
	}

	const emailRedirectTo = `${origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`;
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo,
		},
	});

	if (error) {
		console.error(error.code + " " + error.message);
		return encodedRedirect("error", "/sign-up", error.message, next);
	} else {
		return encodedRedirect(
			"success",
			"/sign-up",
			"Thanks for signing up! Please check your email for a verification link."
		);
	}
};

export const forgotPasswordAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const supabase = createClient();
	const origin = headers().get("origin");
	const callbackUrl = formData.get("callbackUrl")?.toString();

	if (!email) {
		return encodedRedirect("error", "/forgot-password", "Email is required");
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
	});

	if (error) {
		console.error(error.message);
		return encodedRedirect(
			"error",
			"/forgot-password",
			"Could not reset password"
		);
	}

	if (callbackUrl) {
		return redirect(callbackUrl);
	}

	return encodedRedirect(
		"success",
		"/forgot-password",
		"Check your email for a link to reset your password."
	);
};

export const resetPasswordAction = async (formData: FormData) => {
	const supabase = createClient();

	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!password || !confirmPassword) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Password and confirm password are required"
		);
	}

	if (password !== confirmPassword) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Passwords do not match"
		);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		encodedRedirect(
			"error",
			"/protected/reset-password",
			"Password update failed"
		);
	}

	encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
	const supabase = createClient();
	await supabase.auth.signOut();
	return redirect("/sign-in");
};

export const signInWithGitHub = async () => {
	const supabase = createClient();
	const origin = headers().get("origin");
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		console.error("Error signing in with GitHub:", error);
		return encodedRedirect(
			"error",
			"/sign-in",
			"Could not sign in with GitHub"
		);
	}

	return redirect(data.url);
};

export const signInWithGoogleAuth = async (next?: string) => {
	const supabase = createClient();
	const origin = headers().get("origin");
	const isLocalEnv = process.env.NODE_ENV === "development";

	const baseRedirectUrl = isLocalEnv
		? `${origin}/auth/callback`
		: "https://hiero.gl/auth/callback";
	const redirectTo = `${baseRedirectUrl}${next ? `?next=${encodeURIComponent(next)}` : ""}`;

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo,
		},
	});

	if (error) {
		console.error("Error signing in with Google:", error);
		return encodedRedirect(
			"error",
			"/sign-in",
			"Could not sign in with Google"
		);
	}

	console.log("Google sign-in successful, redirecting to:", data.url);
	return redirect(data.url);
};

export const handleSendOtp = async (phoneNumber: string) => {
	const supabase = createClient();

	try {
		const { error } = await supabase.auth.signInWithOtp({
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
};

export const handleVerifyOtp = async (phoneNumber: string, otp: string) => {
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
};

export const handleSignInWithOTP = async (
	email: string,
	isDevelopment: boolean
) => {
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
};

export const handleVerifyOTP = async (
	email: string,
	otp: string,
	isDevelopment: boolean
) => {
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
};
