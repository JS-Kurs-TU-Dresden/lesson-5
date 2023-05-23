import { expect, test, describe, vi, beforeAll, afterAll } from 'vitest'
import { chromium, firefox, webkit } from "playwright";
import { getAbsolutePath } from './absolutePath.js'

const browserTypes = process.env.ALL_BROWSERS
    ? [chromium, firefox, webkit]
    : [chromium];

for (const browserType of browserTypes) {
    describe(`browser:${browserType.name()}`, () => {
        let browser
        const fullPath = getAbsolutePath("../tasks/to-do-list.html");

        beforeAll(async () => {
            browser = await browserType.launch({ headless: true });
        });

        afterAll(async () => {
            browser?.close();
        });

        test("Empty todo list", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h1");

            const result = await page.evaluate(async () => {
                return document.querySelector("#my-todo-list").children.length
            })

            expect(result).toBe(0);
        });

        test("Adding an item", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h1");

            await page.fill("#item-text", "Hello World");
            await page.click("#add-item");

            const result = await page.evaluate(async () => {
                return {
                    length: document.querySelector("#my-todo-list").children.length,
                    text: document.querySelector("#my-todo-list").children[0].childNodes[0].textContent,
                    button: document.querySelector("#my-todo-list").children[0].childNodes[1].textContent
                }
            })

            expect(result.length).toBe(1);
            expect(result.text).toBe("Hello World");
            expect(result.button).toBe("Remove");
        });

        test("Removing an item", async () => {
            const page = await browser.newPage();
            await page.goto(`file://${fullPath}`);

            await page.waitForSelector("h1");

            await page.fill("#item-text", "Hello World");
            await page.click("#add-item");

            await page.click("#my-todo-list div:nth-child(1) button");

            const result = await page.evaluate(async () => {
                return document.querySelector("#my-todo-list").children.length
            })

            expect(result).toBe(0);
        });
    });
}