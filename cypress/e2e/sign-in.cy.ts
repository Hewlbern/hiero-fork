describe("Sign-In Page", () => {
	it("should allow a user to sign in with email and password", () => {
		cy.visit("/sign-in");

		// Fill in the sign-in form
		cy.get('input[name="email"]').type("testuser@example.com");
		cy.get('input[name="password"]').type("SecurePass123");

		// Submit the form
		cy.contains("Sign in").click();

		// Verify redirection to the dashboard
		cy.url().should("include", "/protected/dashboard");
	});

	it("should allow a user to sign in with Google", () => {
		cy.visit("/sign-in");

		// Click on the Google sign-in button
		cy.get("button").contains("Sign in with Google").click();

		// Handle Google OAuth flow (may require stubbing or mock)
		// ...

		// Verify redirection to the dashboard
		cy.url().should("include", "/protected/dashboard");
	});
});
