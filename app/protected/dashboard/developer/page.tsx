import { auth } from "@/auth";
import { DeveloperDashboard } from "@/components/developer-dashboard";
import { createClient } from "@/utils/supabase/server";
import { SessionProvider } from "next-auth/react";

export default async function DeveloperPage() {
	const supabase = createClient();
	const session = await auth();
	const user = session?.user;

	let isFirstTimeUser = true;
	if (user) {
		const { data: apps } = await supabase
			.from("apps")
			.select("id")
			.eq("user_id", user.id)
			.limit(1);

		isFirstTimeUser = apps?.length === 0;
	}

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6 text-gray-800">
				Developer Dashboard
			</h1>
			<SessionProvider>
				<DeveloperDashboard />
			</SessionProvider>
		</div>
	);
}
