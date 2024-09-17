import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GitHubSignInButton } from "@/components/github-sign-in-button";

export default function SignUp({ searchParams }: { searchParams: Message }) {
	return (
		<form className="flex-1 flex flex-col min-w-64">
			{/* ... existing code ... */}
			<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
				{/* ... existing form fields ... */}
				<SubmitButton pendingText="Signing Up..." formAction={signUpAction}>
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
				<FormMessage message={searchParams} />
			</div>
		</form>
	);
}
