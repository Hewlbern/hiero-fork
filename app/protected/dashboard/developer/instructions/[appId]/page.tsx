"use client";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { useRouter } from "next/navigation";
export default function InstructionsPage({
	params,
}: {
	params: { appId: string };
}) {
	const router = useRouter();
	const handleComplete = () => {
		router.push(`/protected/dashboard/developer`);
	};

	return <OnboardingFlow appId={params.appId} onComplete={handleComplete} />;
}
