import { ReactNode } from "react";
import Link from "next/link";
// Removed import of docs.css since we're using Tailwind CSS
// import "@/styles/docs.css";

// Import Shadcn UI components
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex">
			<aside className="fixed h-screen w-64 bg-gray-900 text-white">
				<ScrollArea className="h-full">
					<nav className="p-5">
						<h2 className="text-2xl font-semibold mb-4">Documentation</h2>
						<ul className="space-y-2">
							<li>
								<Link
									href="/docs/getting-started"
									className="block px-4 py-2 hover:text-blue-400"
								>
									Getting Started
								</Link>
							</li>
							<li>
								<Link
									href="/docs/api-endpoints/deduct"
									className="block px-4 py-2 hover:text-blue-400"
								>
									Deduct Tokens
								</Link>
							</li>
							<li>
								<Link
									href="/docs/api-endpoints/balance"
									className="block px-4 py-2 hover:text-blue-400"
								>
									Get Token Balance
								</Link>
							</li>
							{/* ... other links ... */}
						</ul>
					</nav>
				</ScrollArea>
			</aside>
			<main className="flex-1 ml-64 p-5">
				<article className="prose">{children}</article>
			</main>
		</div>
	);
}
