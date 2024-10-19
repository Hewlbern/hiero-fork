describe("App Page", () => {
	it("should display app details based on slug", () => {
		const slug = "catvideogenerator";

		cy.visit(`/a/${slug}`);

		// Verify app name is displayed
		cy.contains("Cat Video Generator").should("be.visible");

		// Verify app icon or other details
		cy.get(".app-icon").should("be.visible");
	});
});
