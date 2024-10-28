import { headers } from "next/headers";

export async function getServerInfo() {
	"use server";
	const headersList = headers();
	return {
		host: headersList.get("host") || "localhost:3000",
		protocol: headersList.get("x-forwarded-proto") || "http",
	};
}
