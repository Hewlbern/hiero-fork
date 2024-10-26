import { test, expect } from "@playwright/test";
import { login } from "../utils/helpers";

test.describe("Developer Dashboard", () => {
	test.beforeEach(async ({ page }) => {
		// Log in programmatically before each test
		await login(page, true);
	});

	test("should display user apps and allow creating a new app", async ({
		page,
	}) => {
		await page.goto("/protected/dashboard/developer");

		// Verify the heading
		await expect(page.locator("text=Developer Dashboard")).toBeVisible();

		// Check for "Create a New App" button
		await page.click("text=Create New App");

		// Verify redirection to create app page
		await expect(page).toHaveURL(
			/\/protected\/dashboard\/developer\/create-app/
		);

		// Fill in the app creation form as needed
		// ...
	});
});
