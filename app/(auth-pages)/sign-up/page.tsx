'use client'
import { signUpAction } from "@/app/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GitHubSignInButton } from "@/components/auth/github-sign-in-button";

export default function SignUp({
	searchParams,
}: {
	searchParams: Message & { next?: string };
}) {
	const next = searchParams.next ? encodeURIComponent(searchParams.next) : "";

	if ("message" in searchParams) {
		return (
			<div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
				<FormMessage message={searchParams} />
			</div>
		);
	}

	return (
		<>
			<form className="flex flex-col min-w-64 max-w-64 mx-auto mt-8">
				<h1 className="text-2xl font-medium">Create an account</h1>

				<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
					<Label htmlFor="email">Email</Label>
					<Input name="email" placeholder="you@example.com" required />
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						name="password"
						placeholder="Your password"
						minLength={6}
						required
					/>
					<input type="hidden" name="next" value={next} />
					<SubmitButton formAction={signUpAction} pendingText="Signing up...">
						Sign up
					</SubmitButton>
					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
					<GitHubSignInButton />
					<div className="flex flex-row justify-center gap-2">
						<p className="text-sm text text-foreground">
							Already have an account?{" "}
							<Link
								className="text-primary font-medium underline text-blue-500"
								href={`/sign-in${next ? `?next=${next}` : ""}`}
							>
								Sign in
							</Link>
						</p>
					</div>
					<FormMessage message={searchParams} />
				</div>
			</form>
		</>
	);
}
