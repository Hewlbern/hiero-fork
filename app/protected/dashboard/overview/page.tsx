import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	return (
		<div className="flex flex-col gap-4 w-full">
			Not yet implemented - go to "developer"
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">
							Total API Calls
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">
							Authenticated Apps
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0</div>
					</CardContent>
				</Card>

				{/* Add more cards for other metrics */}
			</div>
		</div>
	);
}