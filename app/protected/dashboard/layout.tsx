import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col space-y-6 p-4 w-full h-full">
			<div className="flex-grow">{children}</div>
		</div>
	);
}
