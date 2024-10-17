"use client";

import { OnboardingFlow } from "@/components/onboarding-flow";
import { useRouter } from "next/navigation";

export default function CreateAppPage() {
	const router = useRouter();
	const handleComplete = () => {
		router.push("/protected/dashboard/developer");
	};

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6 text-gray-800">Create New App</h1>
			<OnboardingFlow onComplete={handleComplete} />
		</div>
	);
}
