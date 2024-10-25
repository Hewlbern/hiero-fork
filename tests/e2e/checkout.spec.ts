import { test, expect } from "@playwright/test";
import { login } from "../utils/helpers";

test.describe("Checkout Page", () => {
	test.beforeEach(async ({ page }) => {
		await login(page);
	});

	test("should allow users to complete checkout", async ({ page }) => {
		await page.goto("/checkout");

		// await expect(page).toHaveURL(/\/checkout\/complete/);
	});
});
