import { createClient } from "@/utils/supabase/server";
import { verifyPassword } from "@/lib/password";

export interface UserData {
	id: string;
	email: string;
	name: string | null;
	passwordHash: string;
	passwordSalt: string;
}

export async function getUserFromDb(email: string): Promise<UserData | null> {
	const supabase = createClient();

	const { data: user, error } = await supabase
		.from("users")
		.select("id, email, name, password_hash, password_salt")
		.eq("email", email)
		.single();

	if (error || !user) {
		return null;
	}

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		passwordHash: user.password_hash,
		passwordSalt: user.password_salt,
	};
}

export async function verifyUserPassword(email: string, password: string) {
	const user = await getUserFromDb(email);

	if (!user?.passwordHash || !user?.passwordSalt) {
		return null;
	}

	return verifyPassword(password, user.passwordSalt, user.passwordHash);
}

export async function getUserFromDbAndVerifyPassword(
	email: string,
	password: string
): Promise<UserData | null> {
	const user = await getUserFromDb(email);
	return (await verifyUserPassword(email, password)) ? user : null;
}

export async function createUser(
	email: string,
	passwordData: { hash: string; salt: string },
	name: string
): Promise<UserData> {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("users")
		.insert([
			{
				email,
				password_hash: passwordData.hash,
				password_salt: passwordData.salt,
				name,
			},
		])
		.select("id, email, name, password_hash, password_salt")
		.single();

	if (error) {
		throw new Error(error.message);
	}

	if (!data) {
		throw new Error("Failed to create user");
	}
	const user = {
		id: data?.id,
		email: data?.email,
		name: data?.name,
		passwordHash: data?.password_hash,
		passwordSalt: data?.password_salt,
	};

	return user;
}

export async function updateUserPassword(passwordData: {
	hash: string;
	salt: string;
}) {}
