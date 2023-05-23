import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest'
import { chromium, firefox, webkit } from "playwright";
import { getAbsolutePath } from './absolutePath.js'

const browserTypes = process.env.ALL_BROWSERS
    ? [chromium, firefox, webkit]
    : [chromium];

for (const browserType of browserTypes) {
    describe(`browser:${browserType.name()}`, () => {
        let browser;
        const fullPath = getAbsolutePath("../tasks/searching-elements.html");

        beforeAll(async () => {
            browser = await browserType.launch({ headless: true });
        });

        afterAll(async () => {
            browser?.close();
        });

        test("Getting the title of the page", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("#title");

            const result = await page.evaluate(async () => {
                return getElements().title === document.querySelector("#title")
            })
            expect(result).toBe(true);
        });

        test("Getting all green elements", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("article");

            const result = await page.evaluate(async () => {
                const greenElements = Array.from(document.querySelectorAll(".green"));

                for (const element of getElements().greenElements) {
                    if (greenElements.find((el) => el === element) === undefined) {
                        return false;
                    }
                }

                return true;
            })
            expect(result).toBe(true);
        });

        test("Getting the first article", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("article");

            const result = await page.evaluate(async () => {
                return getElements().firstArticle === document.querySelector("article");
            })
            expect(result).toBe(true);
        });

        test("Getting the title of the second article", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("article");

            const result = await page.evaluate(async () => {
                return getElements().secondArticleTitle === document.querySelectorAll("article h2")[1];
            })
            expect(result).toBe(true);
        });

        test("Getting all <li> elements", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("article");

            const result = await page.evaluate(async () => {
                return getElements().firstArticleListItems.length === document.querySelectorAll("li").length;
            })
            expect(result).toBe(true);
        });

        test("Getting all <b> elements of the second article", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("article");

            const result = await page.evaluate(async () => {
                const bElements = Array.from(document.querySelectorAll("article")[1].querySelectorAll("b"));

                for (const element of getElements().secondArticleBoldElements) {
                    if (bElements.find((el) => el === element) === undefined) {
                        return false;
                    }
                }

                return true;
            })
            expect(result).toBe(true);
        });
    });
}