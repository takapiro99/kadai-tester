module.exports = {
  preset: "jest-puppeteer",
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
      },
    ],
  ],
};
