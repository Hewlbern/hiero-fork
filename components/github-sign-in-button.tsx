import { Button } from "@/components/ui/button";
import { siGithub } from "simple-icons";
import { signInWithGitHub } from "@/app/actions/auth";

export function GitHubSignInButton() {
	return (
		<Button variant="outline" onClick={() => signInWithGitHub()}>
			<svg
				role="img"
				viewBox="0 0 24 24"
				className="mr-2 h-4 w-4"
				fill="currentColor"
			>
				<path d={siGithub.path} />
			</svg>
			Continue with GitHub
		</Button>
	);
}
