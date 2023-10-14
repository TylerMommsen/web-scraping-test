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

	const allWatchData = [];

	for (let i = 0; i < 1; i++) {
		await page.goto(watchesLinks[i].link);

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
			const text = container.querySelector('p');
			return text.textContent;
		});

		const manufacturer = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent === 'Manufacturer:') {
					return elements[i + 1].textContent;
				}
			}

			return null;
		});

		const regularPrice = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Regular Price:') {
					return elements[i + 1].textContent.trim();
				}
			}

			return null;
		});

		const itemNumber = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent === 'Item Number:') {
					return elements[i + 1].textContent;
				}
			}

			return null;
		});

		const condition = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Condition:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const modelNameNumber = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Model Name/Number:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const serial = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Serial:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const year = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Year:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const gender = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Gender:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const movement = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Movement:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const productCase = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Case:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const dial = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Dial:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const bracelet = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Bracelet:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const boxAndPapers = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Box & Papers:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const warranty = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Warranty:') {
					return elements[i].nextElementSibling.textContent.trim();
				}
			}

			return null;
		});

		const returnPolicy = await page.evaluate(() => {
			const elements = Array.from(document.querySelectorAll('*'));

			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent.trim() === 'Return Policy:') {
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
				boxAndPapers: boxAndPapers,
				warranty: warranty,
				returnPolicy: returnPolicy,
				photo: photo,
				pageUrl: page.url(),
			},
		];

		allWatchData.push(...productDetails);
	}

	// save data to json

	fs.writeFile('watch-products.json', JSON.stringify(allWatchData), (err) => {
		if (err) throw err;
		console.log('File saved');
	});

	await browser.close();
}

run();
