// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      headless: false,
      screenshot: 'on',
          viewport: { width: 1280, height: 720 },
              launchOptions: {
              slowMo: 150,
          },
    },
  };
  
  module.exports = config;