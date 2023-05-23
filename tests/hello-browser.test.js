import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest'
import { chromium, firefox, webkit } from "playwright";
import { getAbsolutePath } from './absolutePath.js'

const browserTypes = process.env.ALL_BROWSERS
    ? [chromium, firefox, webkit]
    : [chromium];

for (const browserType of browserTypes) {
    describe(`browser:${browserType.name()}`, () => {
        let browser
        const fullPath = getAbsolutePath("../tasks/hello-browser.html");

        beforeAll(async () => {
            browser = await browserType.launch({ headless: true });
        });

        afterAll(async () => {
            browser?.close();
        });

        test("Existing Hello Browser Text", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("div");

            const result = await page.evaluate(async () => {
                return document.querySelector("div").innerText;
            })

            expect(result).toBe("Hello Browser");
        });
    });
}