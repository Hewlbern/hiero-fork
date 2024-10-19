import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000", // Update if your app runs on a different port
		supportFile: "cypress/support/e2e.ts",
		specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
		setupNodeEvents(on, config) {
			// Implement node event listeners if needed
		},
		env: {
			NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
			NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			// Add other environment variables as needed
		},
	},
});
