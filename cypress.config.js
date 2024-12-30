const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'false',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  env: {
    apiUrl: 'site path',
    authToken: 'future-token',
  },
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
});


