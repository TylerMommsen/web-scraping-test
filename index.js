const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.bobswatches.com/luxury-watches/');

	await page.waitForSelector('.item form');

	const watchesLinks = await page.$$eval('.ng-pristine a', (elements) =>
		elements.map((e) => ({
			link: e.href,
		}))
	);

	for (const watchLink of watchesLinks) {
		// console.log(watchLink);
		await page.goto(watchLink.link);
		await page.waitForSelector('.product-info');

		const watchData = await page.$$eval('.product-info', (elements) =>
			elements.map((e) => ({
				name: e.querySelector('h1').textContent,
				price: e.querySelector('.productPrice').textContent,
			}))
		);

		console.log(watchData);
	}

	// console.log(watches);

	// save data to json

	// fs.writeFile('watch-products.json', JSON.stringify(watches), (err) => {
	// 	if (err) throw err;
	// 	console.log('File saved');
	// });

	await browser.close();
}

run();
