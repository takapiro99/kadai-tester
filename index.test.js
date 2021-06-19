const puppeteer = require("puppeteer");
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

// const targets = fileNames.slice(0, 5);
const targets = fileNames;

let browser = null;
let page = null;

const NUMBER_3 = 3;
const NUMBER_15 = 15;
const TEXT_HOGE = "hoge";

describe(`test all HTMLs!: ${targets.length} 件`, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
  });

  afterAll(async () => {
    await browser.close();
  });

  for (let item of targets) {
    if (item.includes("gitkeep")) continue;
    describe(`${item.slice(6)} のテスト`, () => {
      beforeAll(async () => {
        page = await browser.newPage();
        page.on("dialog", dialogHandler);
        const contentHtml = fs.readFileSync(item, "utf8");
        await page.setContent(contentHtml);
        // jest.setTimeout(60000);
      });

      afterAll(async () => {
        await page.close();
      });

      const dialogHandler = jest.fn((dialog) => dialog.dismiss());

      test("1. ユーザーIDが入力できる", async () => {
        const searchBox = await page.$("#user_id");
        await searchBox.type(TEXT_HOGE);
        const name = await page.$eval("#user_id", (el) => el.value);
        await expect(name).toMatch(TEXT_HOGE);
      });

      test("2. user3 で検索したら名前(Clementine Bauch)が出てくる", async () => {
        const searchBox = await page.$("#user_id");
        await searchBox.evaluate((s) => (s.value = ""));
        await searchBox.type(NUMBER_3.toString());
        const search = await page.$(`input[type="button"]`);
        await search.click();
        await page.waitFor(1000);
        const res = await page.$eval("#name1", (el) => el.value);
        expect(res).toBe("Clementine Bauch");
      });

      test("3. user15 で検索したらalertが出てくる", async () => {
        const searchBox = await page.$("#user_id");
        await searchBox.evaluate((s) => (s.value = ""));
        await searchBox.type(NUMBER_15.toString());
        const search = await page.$(`input[type="button"]`);
        await search.click();
        await page.waitFor(1000);
        expect(dialogHandler).toHaveBeenCalled();
      });
    });
  }
});
