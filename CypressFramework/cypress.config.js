const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  console.log("Setting up reporter...");
  // Preprocessor needs the config to generate the JSON reports.
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));

  // Automatically take a screenshot on test failure
  on("task", {
    "failed:cy:screenshot"(info) {
      const screenshotName = `${info.runnable.parent.title} -- ${info.runnable.title} (failed)`;
      return captureScreenshot(`cypress/screenshots/${screenshotName}.png`);
    },
  });

  return config;
}

function captureScreenshot(filename) {
  return cy.screenshot(filename);
}

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  env: {
    // url: "https://cms.demo.katalon.com/",
    url: "https://www.bing.com/translator",
  },

  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/integration/testsuite/bingTranslator.js",
    chromeWebSecurity: false,
  },
});
