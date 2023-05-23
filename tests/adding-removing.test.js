import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest'
import { chromium, firefox, webkit } from "playwright";
import { getAbsolutePath } from './absolutePath.js'

const browserTypes = process.env.ALL_BROWSERS
    ? [chromium, firefox, webkit]
    : [chromium];

for (const browserType of browserTypes) {
    describe(`browser:${browserType.name()}`, () => {
        let browser;
        const fullPath = getAbsolutePath("../tasks/adding-removing.html");

        beforeAll(async () => {
            browser = await browserType.launch({ headless: true });
        });

        afterAll(async () => {
            browser?.close();
        });

        test("Accessing the title", async () => {
            const page = await browser.newPage();
            // page.on("console", (msg) => console.log(msg.text()));
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h1");

            const result = await page.evaluate(async () => {
                return document.querySelector("h1").innerText;
            })
            expect(result).toBe("My Website");
        });

        test("Adding a new task", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("p");

            const result = await page.evaluate(async () => {
                return document.body.firstElementChild.nextElementSibling.nextElementSibling.tagName
            })
            expect(result).toBe("P");
        });

        test("Removing a task", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("p");

            const result = await page.evaluate(async () => {
                return document.getElementById("remove")
            })
            expect(result).toBeNull();
        });

        test("Adding a list of elements", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("p");

            const result = await page.evaluate(async () => {
                return document.querySelector("ul").childElementCount
            })
            expect(result).toBe(5);

            const items = await page.evaluate(async () => {
                return Array.from(document.querySelectorAll("ul li")).map((li) => li.innerText)
            })

            expect(items).toEqual(["Hello", "World", "How", "Are", "You"]);
        });
    });
}