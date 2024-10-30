import { test, expect } from "@playwright/test";
import { login, loginWithCredentials } from "../utils/helpers";

test.describe("Sign-In Page", () => {
	test("should allow a user to sign in with email and password", async ({
		page,
	}) => {
		await page.goto("/");

		await login(page);

		// Wait for navigation to dashboard
		await page.waitForURL(/\/protected\/dashboard\/developer/);
		// Verify redirection to the dashboard
		await expect(page).toHaveURL(/\/protected\/dashboard\/developer/);
	});

	test("should not sign-in with incorrect credentials", async ({ page }) => {
		await page.goto("/");

		await loginWithCredentials(page, "wrong@example.com", "wrongpassword");
		// Check for error message
		await expect(page.locator("form")).toContainText("Invalid credentials");
	});

	test("should allow a user to sign in with Google", async ({ page }) => {
		await page.goto("/sign-in");

		// Click on the Google sign-in button
		await page.click('button:has-text("Continue with Google")');

		// Handle Google OAuth flow (may require mocking or using a testing account)
		// ...

		// Verify redirection to the dashboard
		// await expect(page).toHaveURL(/\/protected\/dashboard/);
	});
});
