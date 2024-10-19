describe("Sign-Up Page", () => {
	beforeEach(() => {
		// Optionally, reset database or delete test user if necessary
	});

	it("should allow a user to sign up", () => {
		cy.visit("/sign-up");

		// Fill in the sign-up form
		cy.get('input[name="email"]').type("testuser@example.com");
		cy.get('input[name="password"]').type("SecurePass123");

		// Submit the form
		cy.contains("Sign up").click();

		// Verify redirection to the dashboard
		cy.url().should("include", "/protected/dashboard");

		// Verify welcome message or user's email is displayed
		cy.contains("Welcome, testuser@example.com").should("be.visible");
	});
});
