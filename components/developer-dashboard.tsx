import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
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
import { ManageApiKeysDialog } from "@/components/manage-api-keys-dialog";
import { DeleteAppButton } from "@/components/delete-app-button";
import { AppDialog } from "@/components/app-dialog";

export async function DeveloperDashboard() {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: apps, error } = await supabase
		.from("apps")
		.select("id, name, status, description, url")
		.eq("user_id", user?.id)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching apps:", error);
		return <div>Error loading apps. Please try again later.</div>;
	}

	return (
		<main className="flex-1 p-4 md:p-8 overflow-auto">
			<header className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Developer Portal</h1>
				<div className="flex space-x-4">
					<Link href="/protected/developers/documentation">Documentation</Link>
				</div>
			</header>

			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-white flex justify-between items-center">
						Your Apps
						<AppDialog
							mode="create"
							triggerButton={<Button>Create New App</Button>}
						/>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="border-b-2 border-black">
								<TableHead className="text-white font-bold">App Name</TableHead>
								<TableHead className="text-white font-bold">Status</TableHead>
								<TableHead className="text-white font-bold">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{apps.map((app) => (
								<TableRow key={app.id} className="border-b-2 border-black">
									<TableCell className="text-white font-bold">
										{app.name}
									</TableCell>
									<TableCell className="text-white font-bold">
										{app.status}
									</TableCell>
									<TableCell>
										<ManageApiKeysDialog appId={app.id} />
										<AppDialog
											mode="edit"
											app={app}
											triggerButton={
												<Button className="bg-[#E6C9A8] text-[#2D4B73] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mr-2">
													Edit
												</Button>
											}
										/>
										<DeleteAppButton appId={app.id} />
										<Link href={`/protected/apps/${app.id}`}>
											<Button className="bg-[#E6C9A8] text-[#2D4B73] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ml-2">
												Generate User Key
											</Button>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</main>
	);
}

export default DeveloperDashboard;
