module.exports = {
  baseUrl: 'http://localhost:3000',
  browser: {
    headless: false,
    slowMo: 50,
    defaultViewport: {
      width: 1280,
      height: 720
    },
    devices: ['iPhone 12', 'Pixel 5', 'Desktop Chrome']
  },
  screenshotPath: './test-results/screenshots',
  videosPath: './test-results/videos',
  testMatch: ['tests/**/*.test.js'],
  timeout: 30000,
  retries: 2
};