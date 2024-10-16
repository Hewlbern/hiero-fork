import { DeveloperDashboard } from "@/components/developer-dashboard";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { createClient } from "@/utils/supabase/server";

export default async function DeveloperPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	let isFirstTimeUser = true;
	if (user) {
		const { data: apps } = await supabase
			.from("apps")
			.select("id")
			.eq("user_id", user.id)
			.limit(1);

		isFirstTimeUser = apps?.length === 0;
	}

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6 text-gray-800">
				Developer Dashboard
			</h1>
			{isFirstTimeUser ? <OnboardingFlow /> : <DeveloperDashboard />}
		</div>
	);
}
