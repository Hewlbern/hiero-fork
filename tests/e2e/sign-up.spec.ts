import { test, expect } from "@playwright/test";

test.describe("Sign-Up Page", () => {
	test.beforeEach(async () => {
		// TODO: Use server client to reset the database
		/* 			const supabase = createClient();

			const allUsers = await supabase.auth.admin.listUsers();

			// Delete test user if exists
			const userId = allUsers?.data?.users.find(
				(u) => u.email === "testuser@example.com"
			)?.id;

			console.log(userId);
			if (userId) {
				const { error } = await supabase.auth.admin.deleteUser(userId);
				console.log(error);
			} */
		// Alternative approach: Reset specific tables
		//
	});

	test("should allow a user to sign up", async ({ page }) => {
		await page.goto("/sign-up");

		// Fill in the sign-up form
		await page.fill('input[name="email"]', "testuser@example.com");
		await page.fill('input[name="password"]', "SecurePass123");

		// Submit the form
		//	await page.click("text=Sign up");

		// TODO: Verify sign-up success

		// // Verify redirection to the dashboard
		// await expect(page).toHaveURL(/\/protected\/dashboard\/developer/);

		// // Verify welcome message or user's email is displayed
		// await expect(
		// 	page.locator("text=Welcome, testuser@example.com")
		// ).toBeVisible();
	});
});
