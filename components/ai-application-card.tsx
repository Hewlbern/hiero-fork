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
			const next = encodeURIComponent(pathname);
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

	return (
		<Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
			<CardHeader className="space-y-1">
				<div className="flex items-center justify-center mb-4">
					<div className="w-12 h-12 bg-blue-600 rounded-full mr-2 transform rotate-12"></div>
					<CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
						HIERO
					</CardTitle>
				</div>
				<CardDescription className="text-center text-lg">
					Access 100s of apps with one subscription!
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="bg-blue-50 p-4 rounded-lg text-center">
					<h3 className="text-2xl font-bold text-blue-800 mb-2">{appName}</h3>
					<div className="flex justify-center space-x-4 mb-2">
						<Badge variant="secondary" className="flex items-center text-lg">
							<DollarSign className="w-5 h-5 mr-1 text-green-500" />$
							{avgSpent.toFixed(2)}/month
						</Badge>
					</div>
					<p className="text-sm text-blue-600">
						Average cost per user per month
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col space-y-4">
				{!uuid ? (
					<Button
						onClick={handleGenerateUUID}
						className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 transition-all duration-200 transform hover:scale-105 text-lg"
					>
						Connect {appName} to Hiero
					</Button>
				) : (
					<div className="w-full space-y-2">
						<div className="flex items-center justify-between bg-gray-100 p-2 rounded">
							<span className="font-mono text-sm truncate text-black">
								{uuid}
							</span>
							<Button onClick={handleCopyUUID} size="sm" className="ml-2">
								{copiedUUID ? (
									<Check className="h-4 w-4" />
								) : (
									<Copy className="h-4 w-4" />
								)}
							</Button>
						</div>
						<p className="text-sm text-center text-gray-600">
							Your UUID has been generated. Copy it to use with {appName}.
						</p>
					</div>
				)}
				<p className="text-sm text-center text-gray-600">
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
	);
}
