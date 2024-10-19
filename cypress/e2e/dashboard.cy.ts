describe("Developer Dashboard", () => {
	beforeEach(() => {
		// Log in programmatically before each test
		cy.login("testuser@example.com", "SecurePass123");
	});

	it("should display user apps and allow creating a new app", () => {
		cy.visit("/protected/dashboard/developer");

		// Verify the heading
		cy.contains("Developer Dashboard").should("be.visible");

		// Check for "Create a New App" button
		cy.contains("Create a New App").should("be.visible").click();

		// Verify redirection to create app page
		cy.url().should("include", "/protected/dashboard/developer/create-app");

		// Fill in the app creation form as needed
		// ...
	});
});
