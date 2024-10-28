"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DeleteAppButton } from "@/components/delete-app-button";
import { App } from "@/types/supabase";
import useAppUrl from "@/hooks/use-appurl";
export function DeveloperDashboard() {
	const [apps, setApps] = useState<App[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

	const { loaded: loadedAppUrl, appUrl: fullAppUrl } = useAppUrl(
		apps[0]?.slug || ""
	);

	const fetchApps = async () => {
		setLoading(true);
		const supabase = createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const { data, error } = await supabase
			.from("apps")
			.select("id, name, status, description, url, slug")
			.eq("user_id", user?.id)
			.is("deleted_at", null)
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching apps:", error);
			setError("Error loading apps. Please try again later.");
		} else {
			setApps((data as App[]) || []);
			setIsFirstTimeUser(data?.length === 0);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchApps();
	}, []);

	const handleAppUpdate = () => {
		fetchApps();
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<main className="flex-1 p-4 md:p-8 overflow-auto">
			<div className="flex justify-end p-2">
				<Link href="/docs" className="hover:underline">
					Documentation
				</Link>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold flex justify-between items-center">
						Your Apps
						<Link href="/protected/dashboard/developer/create-app" passHref>
							<Button>Create New App</Button>
						</Link>
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isFirstTimeUser ? (
						<div className="text-center py-8">
							<p className="text-lg mb-4">
								Welcome! Let&apos;s create your first app.
							</p>
							<Link href="/protected/dashboard/developer/create-app" passHref>
								<Button>Create New App</Button>
							</Link>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow className="border-b-2 border-black">
									<TableHead className="font-bold">App Name</TableHead>
									<TableHead className="font-bold">Status</TableHead>
									<TableHead className="font-bold text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{apps.map((app) => (
									<TableRow key={app.id} className="border-b-2 border-black">
										<TableCell>
											<Link
												href={`/a/${app.slug}`}
												className="hover:underline font-bold text-lg"
											>
												{app.name}
											</Link>
											<br />
											<Link
												href={loadedAppUrl ? "#" : `/a/${app.slug}`}
												className="hover:underline"
											>
												{fullAppUrl}
											</Link>
										</TableCell>
										<TableCell className="font-bold">{app.status}</TableCell>
										<TableCell className="flex flex-row gap-2 justify-end">
											<Link
												href={`/protected/dashboard/developer/edit-app/${app.id}`}
												passHref
											>
												<Button>Edit App</Button>
											</Link>

											<DeleteAppButton
												appId={app.id}
												onAppDeleted={handleAppUpdate}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</main>
	);
}

export default DeveloperDashboard;
