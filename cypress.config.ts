import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
    env: {
      apiUrl: 'http://127.0.0.1:3030/api/v1',
      baseUrl: 'http://127.0.0.1:3000'
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
