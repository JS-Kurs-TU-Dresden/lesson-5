import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest'
import { chromium, firefox, webkit } from "playwright";
import { getAbsolutePath } from './absolutePath.js'

const browserTypes = process.env.ALL_BROWSERS
    ? [chromium, firefox, webkit]
    : [chromium];

for (const browserType of browserTypes) {
    describe(`browser:${browserType.name()}`, () => {
        let browser;
        const fullPath = getAbsolutePath("../tasks/basic-events.html");

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

        test("Clicking on Say Hello", async () => {
            const page = await browser.newPage();
            const log = vi.fn()

            page.on("console", msg => log(msg.text()));
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h1");

            await page.click("#say-hello");

            expect(log).toHaveBeenCalledWith("Hello");
        });

        test("Clicking on Add Ball", async () => {
            const page = await browser.newPage();

            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h1");

            await page.click("#add-ball");

            const ballCount = await page.evaluate(async () => {
                return document.querySelectorAll(".ball").length;
            })

            expect(ballCount).toBe(1);

            await page.click("#add-ball");
            await page.click("#add-ball");

            const ballCount2 = await page.evaluate(async () => {
                return document.querySelectorAll(".ball").length;
            })

            expect(ballCount2).toBe(3);
        });
    });
}