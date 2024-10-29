import { randomBytes, pbkdf2Sync } from "crypto";

interface PasswordData {
	hash: string;
	salt: string;
}

export function saltAndHashPassword(password: string): PasswordData {
	const salt = randomBytes(16).toString("hex");
	const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
	return { hash, salt };
}

export function verifyPassword(
	password: string,
	salt: string,
	storedHash: string
): boolean {
	const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
	return storedHash === hash;
}
