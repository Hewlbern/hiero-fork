// components/CodePre.js
"use client";
import { useState, useRef, useEffect } from "react";
import CodeBlock from "./code-block";

const CodePre = ({ children }: { children?: React.ReactNode }) => {
	const [language, setLanguage] = useState<string>("");

	useEffect(() => {
		// Extract language from the first child if it's a string
		if (typeof children === "string") {
			const match = children.match(/^(\w+)/);
			if (match) setLanguage(match[1]);
		}
	}, [children]);

	return <CodeBlock language={language}>{children}</CodeBlock>;
};

export default CodePre;
