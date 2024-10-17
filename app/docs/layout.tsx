import { ReactNode } from "react";
import Link from "next/link";
// Removed import of docs.css since we're using Tailwind CSS
// import "@/styles/docs.css";

// Import Shadcn UI components
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
	{
		title: "Getting Started",

		href: "/docs/getting-started",
	},

	{
		title: "User Experience",
		href: "/docs/user-experience",
	},
	{
		title: "Launching Pay with Hiero",
		href: "/docs/launching-pay-with-hiero",
	},
	{
		title: "Webhooks",
		href: "/docs/webhooks",
	},
	{
		title: "API Endpoints",
		type: "heading",
		href: "/docs/api-endpoints",
		items: [
			{
				title: "Deduct Tokens",
				href: "/docs/api-endpoints/deduct",
			},
			{
				title: "Get Token Balance",
				href: "/docs/api-endpoints/balance",
			},
		],
	},
];

const getSidebarItems = (items: typeof sidebarItems) => {
	return items.map((item) => {
		if (item.type === "heading") {
			return (
				<li key={item.href}>
					<p className="block px-4 py-2 ">{item.title}</p>
					<ul className="space-y-2">
						{item.items.map((subItem) => (
							<li key={subItem.href}>
								<Link
									href={subItem.href}
									className="block ml-4 px-4 py-2 hover:text-blue-400"
								>
									{subItem.title}
								</Link>
							</li>
						))}
					</ul>
				</li>
			);
		}
		return (
			<li key={item.href}>
				<Link href={item.href} className="block px-4 py-2 hover:text-blue-400">
					{item.title}
				</Link>
			</li>
		);
	});
};

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex">
			<aside className="fixed h-screen w-64 bg-gray-900 text-white">
				<ScrollArea className="h-full">
					<nav className="p-5">
						<h2 className="text-2xl font-semibold mb-4">Documentation</h2>
						<ul className="space-y-2">{getSidebarItems(sidebarItems)}</ul>
					</nav>
				</ScrollArea>
			</aside>
			<main className="flex-1 ml-64 p-5">
				<article className="prose">{children}</article>
			</main>
		</div>
	);
}
