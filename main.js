const playwright = require("playwright");
const nodemailer = require("nodemailer");

async function webscrapper() {
  const browser = await playwright.chromium.launch({
    headless: true, // set this to true
  });

  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/accounts/login/");

  await page.getByLabel("username").fill("zse.poczta1");
  await page.getByLabel("Password").fill("bardzotrudnehaslo1");
  await page.getByText("Log in", { exact: true }).click();
  console.log("logging in...");
  await page.waitForTimeout(10000);

  await page.goto("https://www.instagram.com/stories/make_life_harder/");
  await page.waitForTimeout(10000);
  console.log("going to stories...");

  await page.getByText("View story").click();
  await page.waitForTimeout(2000);

  let counter = 0;

  while (true) {
    const isNext = await page.locator("button[aria-label='Next']").count();
    if (isNext > 0) {
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `screenshots/screenshot-${counter}.png` });
      console.log("screenshot of stories #", counter);
      counter++;

      await page.locator("button[aria-label='Next']").click();
    } else {
      break;
    }
  }

  await browser.close();

}
 webscrapper()