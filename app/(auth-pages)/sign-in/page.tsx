import { signInAction } from "@/app/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GitHubSignInButton } from "@/components/auth/github-sign-in-button";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export default function Login({
	searchParams,
}: {
	searchParams: Message & { next?: string };
}) {
	const next = searchParams.next ? encodeURIComponent(searchParams.next) : "";

	const signUpLink = `/sign-up${next ? `?next=${next}` : ""}`;

	return (
		<form className="flex-1 flex flex-col min-w-64 mt-8">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-2xl font-medium">Sign in</h1>
				<p className="text-sm text-foreground">
					or{" "}
					<Link
						className="text-foreground font-medium text-blue-500 underline"
						href={signUpLink}
					>
						create an account
					</Link>
				</p>
			</div>
			<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
				<Label htmlFor="email">Email</Label>
				<Input name="email" placeholder="you@example.com" />
				<div className="flex justify-between items-center">
					<Label htmlFor="password">Password</Label>
					<Link
						className="text-xs text-foreground underline"
						href="/forgot-password"
					>
						Forgot Password?
					</Link>
				</div>
				<Input type="password" name="password" placeholder="Your password" />
				<Input type="hidden" name="next" value={next} />
				<SubmitButton pendingText="Signing In..." formAction={signInAction}>
					Sign in
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
				<div className="flex flex-col gap-2">
					<GitHubSignInButton />
					<GoogleSignInButton />
				</div>
				<FormMessage message={searchParams} />
			</div>
		</form>
	);
}
