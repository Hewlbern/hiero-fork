"use client";
import { Button } from "@/components/ui/button";
import { siGoogle } from "simple-icons";
import { signInWithGoogleAuth } from "@/app/actions/auth";

export function GoogleSignInButton() {
	return (
		<Button variant="outline" onClick={() => signInWithGoogleAuth()}>
			<svg
				role="img"
				viewBox="0 0 24 24"
				className="mr-2 h-4 w-4"
				fill="currentColor"
			>
				<path d={siGoogle.path} />
			</svg>
			Continue with Google
		</Button>
	);
}
