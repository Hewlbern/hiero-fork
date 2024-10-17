"use client";
import { generateSlugFromDomain } from "@/utils/slug-utils";
import { useEffect } from "react";
import { useDebounce } from "@/utils/use-debounce";
import { useState } from "react";
import { checkSlugAvailability, createApp, editApp } from "@/app/actions/apps";
import { extractDomainFromUrl } from "@/utils/slug-utils";
import { appUrl } from "@/lib/appUrl";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { App } from "@/types/supabase";

export function AppForm({
	mode,
	app,
	onAppCreated,
	onCancel,
}: {
	mode: "create" | "edit";
	app?: Partial<App>;
	onAppCreated?: (app: App) => void;
	onCancel?: () => void | undefined;
}) {
	const [name, setName] = useState(app?.name || "");
	const [url, setUrl] = useState(app?.url || "");
	const [description, setDescription] = useState(app?.description || "");
	const [error, setError] = useState("");
	const [slug, setSlug] = useState(app?.slug || "");
	const [isSlugAvailable, setIsSlugAvailable] = useState(false);
	const debouncedSlug = useDebounce(slug, 300);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const newApp =
				mode === "create"
					? await createApp({ name, url, description, slug })
					: await editApp(app?.id || "", { name, url, description, slug });

			onAppCreated?.(newApp);
		} catch (error) {
			console.error("Error creating app:", error);
			setError(`Failed to ${mode} app. Please try again.`);
		}
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

	const fullAppUrl = appUrl(slug);

	return (
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
						className={`${isSlugAvailable ? "text-green-500" : "text-red-500"}`}
					>
						{isSlugAvailable ? "✓" : "✗"}
					</span>
				)}
			</div>
			<div className="text-sm text-gray-500">{fullAppUrl}</div>
			{error && <p className="text-red-500">{error}</p>}
			<div className="flex justify-end space-x-2">
				{onCancel && (
					<Button type="button" onClick={() => onCancel()} variant="outline">
						Cancel
					</Button>
				)}
				<Button type="submit" disabled={!isSlugAvailable}>
					{mode === "create" ? "Create App" : "Save App"}
				</Button>
			</div>
		</form>
	);
}
