import { Page } from "@playwright/test";

export async function loginWithCredentials(
	page: Page,
	email: string,
	password: string
) {
	await page.goto("/sign-in");

	await page.fill('input[name="email"]', email as string);
	await page.fill('input[name="password"]', password as string);

	await page.getByRole("button", { name: "Sign in", exact: true }).click();
}

export async function login(page: Page, developer: boolean = false) {
	const email = developer
		? process.env.TEST_DEV_EMAIL
		: process.env.TEST_USER_EMAIL;
	const password = developer
		? process.env.TEST_DEV_PASSWORD
		: process.env.TEST_USER_PASSWORD;

	await loginWithCredentials(page, email as string, password as string);
}
