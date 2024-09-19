"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createApp, editApp, checkSlugAvailability } from "@/app/actions/apps";
import { useDebounce } from "@/utils/use-debounce";

// Add this near the top of your file, outside the component
const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

type AppDialogProps = {
	mode: "create" | "edit";
	app?: {
		id: string;
		name: string;
		description: string;
		url: string;
		slug: string;
	};
	triggerButton: React.ReactNode;
};

export function AppDialog({ mode, app, triggerButton }: AppDialogProps) {
	const [name, setName] = useState(app?.name || "");
	const [url, setUrl] = useState(app?.url || "");
	const [description, setDescription] = useState(app?.description || "");
	const [error, setError] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [slug, setSlug] = useState(app?.slug || "");
	const [isSlugAvailable, setIsSlugAvailable] = useState(false);
	const debouncedSlug = useDebounce(slug, 300);

	useEffect(() => {
		if (isOpen && mode === "edit" && app) {
			setName(app.name);
			setUrl(app.url);
			setDescription(app.description);
		}
	}, [isOpen, mode, app]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			let result;
			if (mode === "create") {
				result = await createApp({ name, url, description, slug });
			} else if (mode === "edit" && app) {
				result = await editApp(app.id, { name, url, description, slug });
			}

			if (result?.error) {
				setError(result.error);
			} else {
				setIsOpen(false);
				// Refresh app list or update local state
			}
		} catch (error) {
			setError(`Failed to ${mode} app. Please try again.`);
		}
	};

	const extractDomainFromUrl = (url: string): string => {
		try {
			const urlObject = new URL(url);
			return urlObject.hostname;
		} catch (error) {
			// If the URL is invalid, return the original input
			return url;
		}
	};

	const generateSlugFromDomain = (domain: string): string => {
		// Remove common TLDs
		const domainWithoutTld = domain.replace(
			/\.(com|org|net|io|app|co|dev)$/,
			""
		);
		// Convert to lowercase, replace non-alphanumeric characters with hyphens,
		// and remove leading/trailing hyphens
		return domainWithoutTld
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "");
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newUrl = e.target.value;
		setUrl(newUrl);
		const domain = extractDomainFromUrl(newUrl);
		const generatedSlug = generateSlugFromDomain(domain);
		setSlug(generatedSlug);
	};

	useEffect(() => {
		if (debouncedSlug) {
			checkSlugAvailability(
				debouncedSlug,
				mode === "edit" ? app?.id : undefined
			).then((isAvailable) => {
				setIsSlugAvailable(isAvailable);
			});
		}
	}, [debouncedSlug, mode, app?.id]);

	const fullAppUrl = `${BASE_URL}/a/${slug}`;

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === "create" ? "Create New App" : "Edit App"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="App Name"
						required
					/>
					<Textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="App Description"
					/>
					<Input
						value={url}
						onChange={handleUrlChange}
						placeholder="Website URL"
						type="url"
						required
					/>
					<div className="flex items-center space-x-2">
						<Input
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
							placeholder="app-slug"
							className="w-[calc(100%-1.5rem)]"
						/>
						{isSlugAvailable !== null && (
							<span
								className={`${
									isSlugAvailable ? "text-green-500" : "text-red-500"
								}`}
							>
								{isSlugAvailable ? "✓" : "✗"}
							</span>
						)}
					</div>
					<div className="text-sm text-gray-500">{fullAppUrl}</div>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex justify-end space-x-2">
						<Button
							type="button"
							onClick={() => setIsOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!isSlugAvailable}>
							{mode === "create" ? "Create App" : "Save Changes"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
