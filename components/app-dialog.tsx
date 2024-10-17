"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { AppForm } from "./app-form";
import { App } from "@/types/supabase";

type AppDialogProps = {
	mode: "create" | "edit";
	app?: Partial<App>;
	triggerButton: React.ReactNode;
};

export function AppDialog({ mode, app, triggerButton }: AppDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{mode === "create" ? "Create New App" : "Edit App"}
					</DialogTitle>
				</DialogHeader>
				<AppForm
					mode={mode}
					app={app}
					onCancel={() => setIsOpen(false)}
					onAppCreated={(app: App) => {
						setIsOpen(false);
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
