"use client";

import React, { useState } from "react";
import { CheckCircle, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CopyToClipboardButtonProps {
	code: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
	code,
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setIsCopied(true);
			toast({
				title: "Code copied to clipboard",
				description: "You can now paste it anywhere",
			});
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<button
			onClick={copyToClipboard}
			className="top-2 right-2 p-1 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
			aria-label="Copy code to clipboard"
		>
			{isCopied ? (
				<CheckCircle className="h-4 w-4 text-green-500" />
			) : (
				<Copy className="h-4 w-4 text-gray-300" />
			)}
		</button>
	);
};
