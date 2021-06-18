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
  // const browser = pupetter.launch();
  browser = await pupetter.launch();
  page = await browser.newPage();
  const contentHtml = fs.readFileSync(targetFile, "utf8");
  await page.setContent(contentHtml);
  // await sleep(1000);
});

// test("should display `google` text on page", async () => {
//   await expect(page).toMatch("ユーザーss");
// });

describe("必須課題", () => {
  test(`ユーザーIDが 1 の時の表示が正しい`, async () => {
    // await page.waitForNavigation();
    // const summary = await page.evaluate(
    //   () => document.getElementById("user_id").innerText
    // );
    // console.log(summary);
    // await page.waitForSelector("#user_id");
    // const a = await page.$("input #user_id");
    // const a = await page.$("#user_id");
    // await page.type("input #user_id", "1");
    await expect(page.$("#user_id")).not.toBeNull();
    // const b = await await a.getProperty("textContent").jsonValue();
    // const html = await page.evaluate(() => {
    //   return document.getElementById("user_id").innerHTML;
    // });
    // console.log(html);
    // console.log(a);
    // expect(a).toBe("");
  });
});

// test(`ユーザーIDが 15 の時に alert が出る`);

// // テストすべて終了後の処理
afterAll(async () => {
  await page.close();
  await browser.close();
  // browser.close().then(() => console.log("completed!"));
});
