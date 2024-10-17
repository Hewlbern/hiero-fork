"use client";

import {
	createApiKey,
	deleteApiKey,
	fetchApiKeys,
} from "@/app/actions/api-keys";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { ApiKey, NewApiKey } from "@/types/supabase";
import { Trash } from "lucide-react";

export function ManageApiKeys({ appId }: { appId: string }) {
	const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
	const [newApiKey, setNewApiKey] = useState<NewApiKey | null>(null);

	const { toast } = useToast();

	const handleFetchApiKeys = useCallback(async () => {
		if (!appId) {
			return;
		}
		const result = await fetchApiKeys(appId);
		if (result.success) {
			setApiKeys(result.apiKeys || []);
		} else {
			toast({
				title: "Error",
				description: result.error,
				variant: "destructive",
			});
		}
	}, [appId, toast]);

	useEffect(() => {
		handleFetchApiKeys();
	}, [handleFetchApiKeys]);

	const handleCreateApiKey = async () => {
		if (!appId) {
			return;
		}
		const result = await createApiKey(appId || "");
		if (result.success && result.apiKey) {
			const theNewApiKey = result.apiKey;
			setNewApiKey(theNewApiKey);
			setApiKeys((prevKeys) => [
				...prevKeys,
				{
					id: theNewApiKey.id,
					masked_key: maskApiKey(theNewApiKey.key),
					created_at: theNewApiKey.created_at,
				},
			]);
			toast({
				title: "Success",
				description: "API key created successfully. Make sure to copy it now!",
			});
		} else {
			toast({
				title: "Error",
				description: result.error,
				variant: "destructive",
			});
		}
	};

	const handleDeleteApiKey = async (keyId: string) => {
		const result = await deleteApiKey(keyId);
		if (result.success) {
			setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== keyId));
			toast({
				title: "Success",
				description: "API key deleted successfully",
			});
		} else {
			toast({
				title: "Error",
				description: result.error,
				variant: "destructive",
			});
		}
	};

	const maskApiKey = (key: string) => {
		return `${key.slice(0, 4)}${"*".repeat(key.length - 8)}${key.slice(-4)}`;
	};

	const handleDone = () => {
		setNewApiKey(null);
	};

	return (
		<div className="max-w-2xl mx-auto mb-4">
			<Button className="mb-4" onClick={handleCreateApiKey}>
				Create New API Key
			</Button>
			{newApiKey && (
				<div className="flex flex-col gap-2 p-2 bg-green-100 rounded-md mb-4">
					<p>New API Key (copy it now, it won&apos;t be shown again):</p>
					<div className="flex flex-row gap-2">
						<code>{newApiKey.key}</code>
						<CopyToClipboardButton code={newApiKey.key} />
					</div>
					<Button onClick={handleDone} className="w-20 self-end">
						Done
					</Button>
				</div>
			)}
			<ul>
				{apiKeys
					.filter((key) => key.id !== newApiKey?.id)
					.sort((a, b) => a.created_at.localeCompare(b.created_at))
					.map((key) => (
						<li
							key={key.id}
							className="flex flex-row gap-2 pb-2 justify-between"
						>
							<span>{key.masked_key}</span>
							<Button
								variant="destructive"
								onClick={() => handleDeleteApiKey(key.id)}
							>
								<Trash className="w-4 h-4" />
							</Button>
						</li>
					))}
			</ul>
		</div>
	);
}
