"use client";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { redirect } from "next/navigation";

export default function InstructionsPage({
	params,
}: {
	params: { appId: string };
}) {
	const handleComplete = () => {
		redirect("/protected/dashboard/developer");
	};

	return <OnboardingFlow appId={params.appId} onComplete={handleComplete} />;
}
