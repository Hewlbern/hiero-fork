import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Hiero",
	description: "One subscription to hundreds of apps",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground flex flex-col min-h-screen">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
						<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
							<div className="flex gap-5 items-center font-semibold"></div>
							{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
						</div>
					</nav>

					<main className="flex-grow flex flex-col items-center">
						<div className="flex-1 w-full flex flex-col items-center">
							<div className="flex flex-col max-w-5xl p-5 w-full">
								{children}
							</div>
						</div>
					</main>

					<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4">
						<ThemeSwitcher />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
