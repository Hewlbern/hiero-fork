"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { ManageApiKeys } from "@/components/manage-api-keys";

export default function ApiKeysPage({ params }: { params: { appId: string } }) {
	const router = useRouter();
	const { appId } = params;

	return (
		<div className="max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Manage API Keys</h2>
			<p className="mb-6 text-gray-600">
				API keys are used to authenticate your app
			</p>
			<ManageApiKeys appId={appId} />
			<div className="flex justify-end space-x-2">
				<Button
					variant="secondary"
					onClick={() => router.push(`/dashboard/developer`)}
				>
					Back to Dashboard
				</Button>
				<Button onClick={() => router.push(`../instructions/${appId}`)}>
					How to Integrate
				</Button>
			</div>
		</div>
	);
}
