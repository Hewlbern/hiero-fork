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

	test("App link redirects to app page", async ({ page }) => {
		await page.goto("/protected/dashboard/developer");

		// TODO: need to start with clean database
		/* await page.getByRole("link", { name: "/a/catvideogenerator" }).click();

		await expect(page.locator("text=Cat Video Generator")).toBeVisible(); */
	});

	test("Can create a new app", async ({ page }) => {
		test.slow();
		await page.goto("/protected/dashboard/developer/create-app");

		await page.getByPlaceholder("App Name").click();
		await page.getByPlaceholder("App Name").fill("My Amazing App");
		await page.getByPlaceholder("App Name").press("Tab");
		await page.getByPlaceholder("App Description").fill("Amazing app");

		await page
			.getByPlaceholder("Website URL")
			.fill("https://myamazingapp2.com");

		// TODO: Fix deleting app so that the slug can be reused
		await page.getByRole("button", { name: "Create App" }).click();

		await page.getByRole("button", { name: "Back to Dashboard" }).click();
		/* 
		await page.getByLabel("Copy code to clipboard").click();
		await page.getByRole("button", { name: "Create New API Key" }).click();
		await page.getByLabel("Copy code to clipboard").click();
		await page.getByRole("button", { name: "Done" }).click();
		await page
			.getByRole("button", { name: "Integration Instructions" })
			.click();
		await page.getByRole("button", { name: "Next" }).click();
		await page.getByRole("button", { name: "Next" }).click();
		await page.getByRole("button", { name: "Finish" }).click(); */

		await page
			.getByRole("row", { name: "My Amazing App http://" })
			.getByRole("button")
			.nth(1)
			.click();

		await expect(page.getByLabel("Confirm Deletion")).toBeVisible();

		await page
			.getByRole("dialog", { name: "Confirm Deletion" })
			.getByRole("button", { name: "Delete" })
			.click();

		await expect(
			page.getByRole("row", { name: "My Amazing App http://" })
		).toHaveCount(0);
	});
});
