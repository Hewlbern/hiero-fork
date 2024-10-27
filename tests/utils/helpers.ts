import { Page } from "@playwright/test";

export async function login(page: Page, developer: boolean = false) {
	await page.goto("/sign-in");

	const email = developer
		? process.env.TEST_DEV_EMAIL
		: process.env.TEST_USER_EMAIL;
	const password = developer
		? process.env.TEST_DEV_PASSWORD
		: process.env.TEST_USER_PASSWORD;

	await page.fill('input[name="email"]', email as string);
	await page.fill('input[name="password"]', password as string);

	await page.getByRole("button", { name: "Sign in", exact: true }).click();

	// Wait for navigation to dashboard
	await page.waitForURL(/\/protected\/dashboard\/developer/);
}
