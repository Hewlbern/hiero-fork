import { signOutAction } from "@/app/actions/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { JoinWaitlistModal } from "../join-waitlist-modal";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Menu } from "lucide-react";

export async function AuthButton() {
	const {
		data: { user },
	} = await createClient().auth.getUser();

	return (
		<div className="flex justify-end">
			{user ? (
				<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="bg-black text-white border-2 border-white hover:shadow-[6px_6px_0px_0px_rgba(103,232,249,0.5)] hover:translate-x-[-6px] hover:translate-y-[-6px] data-[state=open]:shadow-[6px_6px_0px_0px_rgba(103,232,249,0.5)] data-[state=open]:translate-x-[-6px] data-[state=open]:translate-y-[-6px] transition-all font-bold text-lg">
								{user.email}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-black text-white">
							<DropdownMenuItem>
								<form action={signOutAction} className="w-full">
									<Button
										type="submit"
										variant="ghost"
										className="w-full justify-start font-bold hover:bg-white hover:text-black transition-colors"
									>
										Log Out
									</Button>
								</form>
							</DropdownMenuItem>
						</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<JoinWaitlistModal>
					<Button className="bg-black text-white border-2 border-white hover:shadow-[6px_6px_0px_0px_rgba(103,232,249,0.5)] hover:translate-x-[-6px] hover:translate-y-[-6px] active:shadow-[6px_6px_0px_0px_rgba(103,232,249,0.5)] active:translate-x-[-6px] active:translate-y-[-6px] transition-all font-bold text-lg">
						Join Waitlist
					</Button>
				</JoinWaitlistModal>
			)}
		</div>
	);
}

export default function Header() {
	return (
		<header className="w-full bg-black border-b-3 border-white p-3">
			<div className="container mx-auto flex flex-wrap justify-between items-center">
				<Link href="/" className="flex items-center">
					<Image
						src="/0_0.jpeg"
						alt="Logo"
						width={40}
						height={40}
						className="border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
					/>
					<span className="ml-3 text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
						Hiero
					</span>
				</Link>
				<div className="flex items-center space-x-2 md:space-x-4">
					<div className="hidden md:block">
						<AuthButton />
					</div>
					<ThemeSwitcher />
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="md:hidden">
							<Button variant="outline" size="icon">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48 md:hidden">
							<DropdownMenuItem>
								<AuthButton />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
