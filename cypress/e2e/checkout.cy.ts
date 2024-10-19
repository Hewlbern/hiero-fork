describe("Checkout Page", () => {
	beforeEach(() => {
		cy.login("testuser@example.com", "SecurePass123");
	});

	it("should allow users to complete checkout", () => {
		cy.visit("/checkout");

		// Fill in payment details
		cy.get('input[name="cardNumber"]').type("4242 4242 4242 4242");
		cy.get('input[name="expiryDate"]').type("12/25");
		cy.get('input[name="cvc"]').type("123");

		// Submit the payment form
		cy.contains("Submit Payment").click();

		// Verify success message or redirection
		cy.contains("Payment Successful").should("be.visible");
		// Or verify redirection
		// cy.url().should('include', '/checkout/complete');
	});
});
