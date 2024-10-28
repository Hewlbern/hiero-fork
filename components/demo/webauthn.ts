export function deserializePublicKey(publicKey: any) {
	if (publicKey.challenge) {
		publicKey.challenge = base64ToArrayBuffer(publicKey.challenge);
	}

	if (publicKey.allowCredentials) {
		publicKey.allowCredentials = publicKey.allowCredentials.map(
			(credential: any) => ({
				...credential,
				id: base64ToArrayBuffer(credential.id),
			})
		);
	}

	return publicKey;
}

export function serializeCredential(credential: any) {
	return {
		id: credential.id,
		rawId: arrayBufferToBase64(credential.rawId),
		response: {
			authenticatorData: arrayBufferToBase64(
				credential.response.authenticatorData
			),
			clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
			signature: arrayBufferToBase64(credential.response.signature),
		},
		type: credential.type,
	};
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binaryString = atob(base64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
}
