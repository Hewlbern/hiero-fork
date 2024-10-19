declare namespace Cypress {
	interface Chainable {
		login(email: string, password: string): Chainable<void>;
	}
}

Cypress.Commands.add("login", (email, password) => {
	cy.request("POST", "/api/auth/login", {
		email,
		password,
	}).then((response) => {
		// Assume the response contains an auth token
		window.localStorage.setItem("authToken", response.body.token);
	});
});
