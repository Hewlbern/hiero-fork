"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { deleteApp } from "@/app/actions/delete-app";
import { useState } from "react";

interface DeleteAppButtonProps {
	appId: string;
}

export function DeleteAppButton({ appId }: DeleteAppButtonProps) {
	const [open, setOpen] = useState(false);
	const handleConfirmDelete = async () => {
		try {
			await deleteApp(appId);
			// Optionally, you can add a toast notification here to confirm deletion
			// You might also want to trigger a refresh of the app list
		} catch (error) {
			console.error("Failed to delete app:", error);
			// Handle error (e.g., show an error message to the user)
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-[#D05353] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-[#4A7B9D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:max-w-[425px]">
				<form
					onSubmit={(event) => {
						handleConfirmDelete().then(() => setOpen(false));
						event.preventDefault();
					}}
				>
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-white">
							Confirm Deletion
						</DialogTitle>
						<DialogDescription className="text-white">
							Are you sure you want to delete this app? This action can&apos;t
							be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button
								type="button"
								variant="outline"
								className="bg-[#E6C9A8] text-[#2D4B73] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							className="bg-[#D05353] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
						>
							Delete
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
