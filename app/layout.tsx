import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

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
					<main className="flex-grow flex flex-col items-center">
						{children}
					</main>

					<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-1 py-1">
						<ThemeSwitcher />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
