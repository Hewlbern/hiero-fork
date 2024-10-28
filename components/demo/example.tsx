"use client";

import { useEffect, useRef } from "react";
import { deserializePublicKey, serializeCredential } from "./webauthn";
import { PasskeyElement } from "./passkey-element";

export default function Home() {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		const handleMessage = async (event: MessageEvent) => {
			// Replace with environment variable
			if (event.origin !== process.env.NEXT_PUBLIC_AUTH_APP_URL) return;

			if (event.data.type === "PASSKEY_REQUEST") {
				try {
					const credential = await navigator.credentials.get({
						publicKey: deserializePublicKey(event.data.options),
					});

					if (credential && iframeRef.current?.contentWindow) {
						iframeRef.current.contentWindow.postMessage(
							{
								type: "PASSKEY_RESPONSE",
								credential: serializeCredential(credential),
							},
							event.origin
						);
					}
				} catch (error) {
					if (iframeRef.current?.contentWindow) {
						iframeRef.current.contentWindow.postMessage(
							{
								type: "PASSKEY_ERROR",
								error: error instanceof Error ? error.message : "Unknown error",
							},
							event.origin
						);
					}
				}
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	const handleSuccess = (userId: string) => {
		console.log("User authenticated:", userId);
		// Handle successful authentication
	};

	const handleError = (error: Error) => {
		console.error("Authentication error:", error);
		// Handle authentication error
	};

	return (
		<main className="min-h-screen p-8">
			<h1 className="text-2xl font-bold mb-6">Passkey Authentication Demo</h1>
			<div className="border rounded-lg p-4 max-w-2xl">
				<PasskeyElement
					secretKey={process.env.NEXT_PUBLIC_PASSKEY_SIGNING_KEY}
				/>
			</div>
		</main>
	);
}
