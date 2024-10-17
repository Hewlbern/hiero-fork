"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { OnboardingFlow } from "@/components/onboarding-flow";

export function CreateNewAppButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Create New App</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New App</DialogTitle>
				</DialogHeader>
				<OnboardingFlow onComplete={() => setIsOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
