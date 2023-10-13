const puppeteer = require('puppeteer');

async function run() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.bobswatches.com/luxury-watches/');

	const html = await page.content();

	await browser.close();
}

run();
