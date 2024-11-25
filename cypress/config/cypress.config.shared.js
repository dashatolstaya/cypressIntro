const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    //const configFile = config.env.configFile || 'dev'
    //const configJson = getConfigurationByFile(configFile);
    //console.log(configJson)
    //console.log(config);
   // config = { ...config, ...configJson };

    // config.baseUrl = config.env.BASE_URL || 'https://staging-bpm-colab.vercel.app'
    //return config
  //},
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
});


