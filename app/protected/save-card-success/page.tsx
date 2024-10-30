"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SaveCardSuccessPageComponent() {
	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading"
	);
	const searchParams = useSearchParams();
	const sessionId = searchParams?.get("session_id");

	useEffect(() => {
		if (sessionId) {
			fetch(`/api/verify-setup-session?session_id=${sessionId}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						setStatus("success");
					} else {
						setStatus("error");
					}
				})
				.catch(() => setStatus("error"));
		}
	}, [sessionId]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "error") {
		return <div>An error occurred. Please try again.</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Card Saved Successfully</h1>
			<p className="mb-4">Your card has been saved for future purchases.</p>
			<Link href="/" className="text-blue-500 hover:underline">
				Return to Home
			</Link>
		</div>
	);
}

export default function SaveCardSuccessPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SaveCardSuccessPageComponent />
		</Suspense>
	);
}
