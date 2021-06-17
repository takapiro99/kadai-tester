const pupetter = require("puppeteer");
const fs = require("fs");
const path = require("path");

const getFileNames = (dirpath = "files") => {
  const allFiles = fs.readdirSync(dirpath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    return files;
  });
  return allFiles.map((s) => path.join(dirpath, s));
};

const fileNames = getFileNames();

const targetFile = fileNames[0];
// console.log(targetFile);

let page, browser;

beforeAll(async () => {
  browser = await pupetter.launch();
  page = await browser.newPage();
  // page = await browser.newPage()
  // await page.goto('https://google.com')
  const contentHtml = fs.readFileSync(targetFile, "utf8");
  // console.log(contentHtml);
  await page.setContent(contentHtml);
});

// テストすべて終了後の処理
afterAll(async () => {
  await page.close();
  await browser.close();
});

test("should display `google` text on page", async () => {
  await expect(page).toMatch("ユーザーss");
});
