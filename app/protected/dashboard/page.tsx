import { redirect } from "next/navigation";

// Start Generation Here
export default async function DashboardPage() {
	redirect("/protected/dashboard/developer");
}
