const { defineConfig } = require('cypress');
const sharedConfig = require('./cypress.config.shared');

module.exports = defineConfig({
    ...sharedConfig,
    baseUrl: 'https://qauto.forstudy.space/',
    env: {
        email: 'daria@qauto.com',
        password: 'password123',
    },
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: true,
        json: true,
    },
});
