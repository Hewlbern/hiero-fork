"use client";
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, DollarSign, Copy, Check } from "lucide-react";
import { generateUserConnectionKey } from "@/app/actions/generate-user-connection-key";
import { createClient } from "@/utils/supabase/client";
import { encodedRedirect } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type AIApp = {
	id: string;
	name: string;
	icon: React.ReactNode;
	color: string;
	loginUrl: string;
	uuid: string;
	rating: string;
	multiplier: string;
	tokenPrice: string;
	amountSpent: number;
	usage: number;
};

type AIAppProps = {
	app: AIApp;
};

export function AIApplicationCard({ app }: AIAppProps) {
	const router = useRouter();
	const pathname = usePathname();
	const [uuid, setUUID] = useState<string | null>(null);
	const [copiedUUID, setCopiedUUID] = useState(false);
	const appName = app.name;
	const avgSpent = 6.73;
	const supabase = createClient();

	const handleGenerateUUID = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			const next = pathname ? encodeURIComponent(pathname) : undefined;
			router.push(`/sign-in?message=You need to sign in&next=${next}`);
			return;
		}

		const newUUID = await generateUserConnectionKey(app.id);
		setUUID(newUUID);
	};

	const handleCopyUUID = () => {
		if (uuid) {
			navigator.clipboard.writeText(uuid);
			setCopiedUUID(true);
			setTimeout(() => setCopiedUUID(false), 2000);
		}
	};

	const truncateAppName = (name: string, maxLength: number) => {
		return name.length > maxLength
			? name.substring(0, maxLength - 3) + "..."
			: name;
	};

	return (
		<div className="flex justify-center p-4 pt-8 sm:pt-16">
			<Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
				<CardHeader className="space-y-1 p-4 sm:p-6">
					<div className="flex items-center justify-center mb-2 sm:mb-4">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full mr-2 transform rotate-12"></div>
						<CardTitle className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							HIERO
						</CardTitle>
					</div>
					<CardDescription className="text-center text-base sm:text-lg">
						Access 100s of apps with one subscription!
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 p-4 sm:p-6">
					<div className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center">
						<h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2">
							{appName}
						</h3>
						<div className="flex justify-center space-x-2 sm:space-x-4 mb-2">
							<Badge
								variant="secondary"
								className="flex items-center text-sm sm:text-lg"
							>
								<DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-green-500" />
								${avgSpent.toFixed(2)}/month
							</Badge>
						</div>
						<p className="text-xs sm:text-sm text-blue-600">
							Average cost per user per month
						</p>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
					{!uuid ? (
						<Button
							onClick={handleGenerateUUID}
							className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 sm:py-3 px-4 transition-all duration-200 transform hover:scale-105 text-base sm:text-lg"
						>
							Connect to Hiero
						</Button>
					) : (
						<div className="w-full space-y-2">
							<div className="flex items-center justify-between bg-gray-100 p-2 rounded">
								<span className="font-mono text-xs sm:text-sm truncate text-black flex-grow mr-2">
									{uuid}
								</span>
								<Button
									onClick={handleCopyUUID}
									size="sm"
									className="flex-shrink-0"
								>
									{copiedUUID ? (
										<Check className="h-4 w-4" />
									) : (
										<Copy className="h-4 w-4" />
									)}
								</Button>
							</div>
							<p className="text-xs sm:text-sm text-center text-gray-600">
								Your UUID has been generated. Copy it to use with {appName}.
							</p>
						</div>
					)}
					<p className="text-xs sm:text-sm text-center text-gray-600">
						By connecting, you agree to Hiero&apos;s{" "}
						<a href="#" className="text-blue-600 hover:underline">
							Terms of Service
						</a>{" "}
						and{" "}
						<a href="#" className="text-blue-600 hover:underline">
							Privacy Policy
						</a>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
