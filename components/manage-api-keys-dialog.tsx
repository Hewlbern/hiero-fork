"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	createApiKey,
	deleteApiKey,
	fetchApiKeys,
} from "@/app/actions/api-keys";
import { useToast } from "@/hooks/use-toast";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";

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
				<Button className="bg-[#7C9885] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mr-2">
					Manage API Keys
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] bg-transparent p-0">
				<div className="bg-[#4A7B9D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full relative">
					<h2 className="text-3xl font-bold text-white mb-6">
						Manage API Keys
					</h2>
					<Button
						onClick={handleCreateApiKey}
						className="bg-[#7C9885] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-4"
					>
						Create New API Key
					</Button>
					{newApiKey && (
						<div className="mb-4 p-4 bg-yellow-100 border-2 border-yellow-500 rounded">
							<p className="font-bold mb-2">
								New API Key (copy it now, it won&apos;t be shown again):
							</p>
							<div className="flex items-center space-x-2">
								<code className="bg-white p-2 rounded flex-grow overflow-x-auto">
									{newApiKey}
								</code>
								<CopyToClipboardButton code={newApiKey} />
							</div>
							<Button
								onClick={handleDone}
								className="mt-2 bg-[#7C9885] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
							>
								Done
							</Button>
						</div>
					)}
					<ul className="space-y-2">
						{apiKeys.map((key) => (
							<li key={key.id} className="flex justify-between items-center">
								<span className="font-mono">{key.masked_key}</span>
								<Button
									onClick={() => handleDeleteApiKey(key.id)}
									className="bg-[#D05353] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
