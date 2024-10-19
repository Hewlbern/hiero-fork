describe("Home Page", () => {
	it("should display the main heading and join waitlist modal", () => {
		cy.visit("/");

		// Verify the main heading is displayed
		cy.contains("Hiero: One Subscription for Everything AI").should(
			"be.visible"
		);

		// Click the "Join Waitlist" button
		cy.contains("Join Waitlist").click();

		// Verify the modal appears
		cy.get('[data-testid="join-waitlist-modal"]')
			.should("exist")
			.and("be.visible");
	});
});
