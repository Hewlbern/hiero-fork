"use client";

import { useState, useEffect, useCallback } from "react";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	createApiKey,
	deleteApiKey,
	fetchApiKeys,
} from "@/app/actions/api-keys";
import { useToast } from "@/hooks/use-toast";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { DialogDescription } from "@radix-ui/react-dialog";

interface ApiKey {
	id: string;
	masked_key: string;
}

export function ManageApiKeysDialog({ appId }: { appId: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
	const [newApiKey, setNewApiKey] = useState<string | null>(null);

	const { toast } = useToast();

	const handleFetchApiKeys = useCallback(async () => {
		const result = await fetchApiKeys(appId);
		console.log(result);
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
		if (isOpen) {
			handleFetchApiKeys();
		}
	}, [isOpen, handleFetchApiKeys]);

	const handleCreateApiKey = async () => {
		const result = await createApiKey(appId);
		if (result.success) {
			setNewApiKey(result.apiKey.key);
			setApiKeys((prevKeys) => [
				...prevKeys,
				{ id: result.apiKey.id, masked_key: maskApiKey(result.apiKey.key) },
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
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open);
				if (!open) setNewApiKey(null);
			}}
		>
			<DialogTrigger asChild>
				<Button>Manage API Keys</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Manage API Keys</DialogTitle>
				<div className="flex flex-col gap-2">
					<DialogDescription>Create or delete API keys</DialogDescription>
					<Button onClick={handleCreateApiKey}>Create New API Key</Button>
					{newApiKey && (
						<div className="flex flex-col gap-2 p-2">
							<p>New API Key (copy it now, it won&apos;t be shown again):</p>
							<div className="flex flex-row gap-2">
								<code>{newApiKey}</code>
								<CopyToClipboardButton code={newApiKey} />
							</div>
							<Button onClick={handleDone} className="w-20 self-end">
								Done
							</Button>
						</div>
					)}
					<ul>
						{apiKeys.map((key) => (
							<li
								key={key.id}
								className="flex flex-row gap-2 p-2 justify-between"
							>
								<span>{key.masked_key}</span>
								<Button
									onClick={() => handleDeleteApiKey(key.id)}
									className="w-20"
								>
									Delete
								</Button>
							</li>
						))}
					</ul>
				</div>
			</DialogContent>
		</Dialog>
	);
}
