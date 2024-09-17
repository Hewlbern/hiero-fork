"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tabItems = [
	{ value: "overview", label: "Overview", href: "/protected" },
	{ value: "apps", label: "Apps", href: "/protected/apps" },
	{ value: "usage", label: "Usage", href: "/protected/usage" },
	{ value: "developer", label: "Developer", href: "/protected/developer" },
];

export function DashboardTabs({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("overview");

	useEffect(() => {
		const currentTab = tabItems.find((tab) => tab.href === pathname);
		if (currentTab) {
			setActiveTab(currentTab.value);
		}
	}, [pathname]);

	const handleTabChange = (value: string) => {
		const tab = tabItems.find((tab) => tab.value === value);
		if (tab) {
			router.push(tab.href);
		}
	};

	return (
		<Tabs
			value={activeTab}
			onValueChange={handleTabChange}
			className="space-y-4"
		>
			<TabsList>
				{tabItems.map((tab) => (
					<TabsTrigger key={tab.value} value={tab.value}>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent value={activeTab}>{children}</TabsContent>
		</Tabs>
	);
}
