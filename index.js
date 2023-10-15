const puppeteer = require('puppeteer');
const fs = require('fs');

const allWatchData = [];

async function run() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	for (let currPage = 1; currPage < 2; currPage++) {
		await page.goto(`https://www.bobswatches.com/luxury-watches/?page=${currPage}`);

		await page.waitForSelector('.ss-item-container');

		const watchesLinks = await page.$$eval('.ng-pristine a', (elements) =>
			elements.map((e) => ({
				link: e.href,
			}))
		);

		const promises = [];

		for (let i = 0; i < watchesLinks.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, 10));
			promises.push(
				browser.newPage().then(async (page) => {
					await page.goto(watchesLinks[i].link);
					await scrapeProductData(page);
				})
			);
		}

		await Promise.all(promises);
	}

	console.log(allWatchData, allWatchData.length);

	// save data to json

	fs.writeFile('watch-products.json', JSON.stringify(allWatchData), (err) => {
		if (err) throw err;
		console.log('File saved');
	});

	await browser.close();
}

async function scrapeProductData(page) {
	const name = await page.evaluate(() => {
		const container = document.querySelector('.product-info');
		const text = container.querySelector('h1');
		return text.textContent;
	});

	const price = await page.evaluate(() => {
		const totalPrice = document.querySelector('.productPrice');
		return totalPrice.textContent;
	});

	const description = await page.evaluate(() => {
		const container = document.querySelector('.product-description');
		const texts = container.querySelectorAll('p');
		let text = texts[texts.length - 1];
		if (texts.length === 0) return null;
		if (texts.length === 1 && text.textContent.trim() === '') return null;

		if (text.textContent.trim() === '' && texts.length > 1) text = texts[1];
		return text.textContent;
	});

	const manufacturer = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent === 'Manufacturer:') {
				return elements[i + 1].textContent;
			}
		}

		return null;
	});

	const regularPrice = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Regular Price:') {
				return elements[i + 1].textContent.trim().replace('$', '');
			}
		}

		return null;
	});

	const itemNumber = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent === 'Item Number:') {
				return elements[i + 1].textContent;
			}
		}

		return null;
	});

	const condition = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Condition:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const modelNameNumber = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Model Name/Number:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const serial = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Serial:') {
				return elements[i].nextElementSibling.textContent.trim();
			}

			if (elements[i].textContent.trim() === 'Serial/Year:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const year = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Year:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const gender = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Gender:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const movement = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Movement:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const productCase = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Case:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const dial = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Dial:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const bracelet = await page.evaluate(() => {
		const container = document.querySelector('#panel-collapseProductDetail');
		const elements = Array.from(container.querySelectorAll('*'));

		for (let i = 0; i < elements.length; i++) {
			if (elements[i].textContent.trim() === 'Bracelet:') {
				return elements[i].nextElementSibling.textContent.trim();
			}
		}

		return null;
	});

	const photo = await page.evaluate(() => {
		const container = document.querySelector('.swiper-slide');
		const img = container.querySelector('img');
		return img.src;
	});

	const productDetails = [
		{
			name: name,
			price: price,
			description: description,
			manufacturer: manufacturer,
			regularPrice: regularPrice,
			itemNumber: itemNumber,
			condition: condition,
			modelNameNumber: modelNameNumber,
			serial: serial,
			year: year,
			gender: gender,
			movement: movement,
			case: productCase,
			dial: dial,
			bracelet: bracelet,
			photo: photo,
			pageUrl: page.url(),
		},
	];

	allWatchData.push(...productDetails);
}

run();
