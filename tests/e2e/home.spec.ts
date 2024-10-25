import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
	test("should display the main heading and join waitlist modal", async ({
		page,
	}) => {
		await page.goto("/");

		// Verify the main heading is displayed
		await expect(page.locator("text=AI Payments")).toBeVisible();

		// Click the "Join Waitlist" button
		await page.click("text=Join Waitlist");

		// Verify the modal appears
		await expect(page.getByLabel("Become a Hiero Developer.")).toBeVisible();
	});
});
