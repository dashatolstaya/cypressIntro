const sharedConfig = require('./cypress.config.shared');
const {defineConfig} = require("cypress");

module.exports = defineConfig({
    ...sharedConfig,
    baseUrl: 'https://qauto2.forstudy.space/',
    env: {
        email: 'user2@qauto.com',
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
