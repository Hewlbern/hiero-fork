import { DeveloperDashboard } from "@/components/developer-dashboard";
import { SessionProvider } from "next-auth/react";

export default async function DeveloperPage() {
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
