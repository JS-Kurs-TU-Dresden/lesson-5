import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest'
import { chromium, firefox, webkit } from "playwright";
import { getAbsolutePath } from './absolutePath.js'

const browserTypes = process.env.ALL_BROWSERS
    ? [chromium, firefox, webkit]
    : [chromium];

for (const browserType of browserTypes) {
    describe(`browser:${browserType.name()}`, () => {
        let browser;
        const fullPath = getAbsolutePath("../tasks/manipulating-dom.html");

        beforeAll(async () => {
            browser = await browserType.launch({ headless: true });
        });

        afterAll(async () => {
            browser?.close();
        });

        test("Accessing the title", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h1");

            const result = await page.evaluate(async () => {
                return document.querySelector("h1").innerText;
            })
            expect(result).toBe("My Website");
        });

        test("Name of the first title", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h2");

            const result = await page.evaluate(async () => {
                return document.querySelector("h2").innerText;
            })
            expect(result).toBe("This is the first article");
        });

        test("First article text color", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h2");

            const result = await page.evaluate(async () => {
                return document.querySelector("article").style.color;
            })

            expect(result).toBe("blue");
        });

        test("Second article background color", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h2");

            const result = await page.evaluate(async () => {
                return document.querySelectorAll("article")[1].style.backgroundColor;
            })

            expect(result).toBe("yellow");
        });
    });
}