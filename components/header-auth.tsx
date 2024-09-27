import { signOutAction } from "@/app/actions/auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function AuthButton() {
	const {
		data: { user },
	} = await createClient().auth.getUser();

	if (!hasEnvVars) {
		return (
			<>
				<div className="flex gap-4 items-center">
					<div>
						<Badge
							variant={"default"}
							className="font-normal pointer-events-none"
						>
							Please update .env.local file with anon key and url
						</Badge>
					</div>
					<div className="flex gap-2">
						<Button
							asChild
							size="sm"
							variant={"outline"}
							disabled
							className="opacity-75 cursor-none pointer-events-none"
						>
							<Link href="/sign-in">Sign in</Link>
						</Button>
						<Button
							asChild
							size="sm"
							variant={"default"}
							disabled
							className="opacity-75 cursor-none pointer-events-none"
						>
							<Link href="/sign-up">Sign up</Link>
						</Button>
					</div>
				</div>
			</>
		);
	}
	return user ? (
		<div className="flex items-center gap-4">
			Hey, {user.email}!
			<form action={signOutAction}>
				<Button type="submit" variant={"outline"}>
					Sign out
				</Button>
			</form>
		</div>
	) : (
		<div className="flex gap-2">
			<Button asChild size="sm" variant={"outline"}>
				<Link href="/sign-in">Sign in</Link>
			</Button>
			<Button asChild size="sm" variant={"default"}>
				<Link href="/sign-up">Sign up</Link>
			</Button>
		</div>
	);
}

export function Header() {
	return (
		<header className="w-full bg-black border-b-4 border-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="flex items-center">
					<Image
						src="/0_0.jpeg"
						alt="Logo"
						width={40}
						height={40}
						className="border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
					/>
					<span className="ml-3 text-white text-2xl font-black uppercase tracking-tighter">
						Hiero
					</span>
				</Link>
				<AuthButton />
			</div>
		</header>
	);
}
