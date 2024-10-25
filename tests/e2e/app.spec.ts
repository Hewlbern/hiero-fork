import { test, expect } from "@playwright/test";

test.describe("App Page", () => {
	test("should display app details based on slug", async ({ page }) => {
		const slug = "catvideogenerator";
		await page.goto(`/a/${slug}`);

		// Verify app name is displayed
		await expect(page.locator("text=Cat Video Generator")).toBeVisible();
	});
});
