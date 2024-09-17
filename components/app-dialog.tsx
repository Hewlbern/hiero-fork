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
import { createApp } from "@/app/actions/create-app";
import { editApp } from "@/app/actions/edit-app";

type AppDialogProps = {
	mode: "create" | "edit";
	app?: { id: string; name: string; description: string; url: string };
	triggerButton: React.ReactNode;
};

export function AppDialog({ mode, app, triggerButton }: AppDialogProps) {
	const [name, setName] = useState(app?.name || "");
	const [url, setUrl] = useState(app?.url || "");
	const [description, setDescription] = useState(app?.description || "");
	const [error, setError] = useState("");
	const [isOpen, setIsOpen] = useState(false);

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
				result = await createApp({ name, url, description });
			} else if (mode === "edit" && app) {
				result = await editApp(app.id, { name, url, description });
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
					<Input
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder="Website URL"
						type="url"
						required
					/>
					<Textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="App Description"
					/>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex justify-end space-x-2">
						<Button
							type="button"
							onClick={() => setIsOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button type="submit">
							{mode === "create" ? "Create App" : "Save Changes"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
