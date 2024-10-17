"use client";
import { useState, useRef, useEffect } from "react";
import { CopyToClipboardButton } from "./copy-to-clipboard-button";

const CodeBlock = ({
	language,
	children,
}: {
	language: string;
	children?: React.ReactNode;
}) => {
	const textInput = useRef<HTMLPreElement>(null);

	return (
		<div className="my-8 bg-[#f6f8fa] dark:bg-[#161b22] rounded-md border border-[#d0d7de] dark:border-[#30363d] overflow-hidden">
			{/* Toolbar/Header with Language and Copy Button */}
			<div className="flex justify-between items-center px-4 py-2 bg-[#f6f8fa] dark:bg-[#161b22] border-b border-[#d0d7de] dark:border-[#30363d]">
				<span className="text-sm text-[#57606a] dark:text-[#8b949e] font-mono">
					{language}
				</span>
				<CopyToClipboardButton code={textInput?.current?.textContent || ""} />
			</div>

			{/* Code Block */}
			<div className="p-4 overflow-auto">
				<code
					ref={textInput}
					className="text-sm font-mono text-[#24292f] dark:text-[#c9d1d9]"
				>
					{children}
				</code>
			</div>
		</div>
	);
};

export default CodeBlock;
