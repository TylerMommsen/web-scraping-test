import jsonData from './watch-products.json';

function createDisplay() {
	const body = document.body;
	const name = document.createElement('p');
	const price = document.createElement('p');
	const description = document.createElement('p');
	const img = document.createElement('img');

	name.textContent = jsonData[0].name;
	price.textContent = `$${jsonData[0].price}`;
	description.textContent = jsonData[0].description;
	img.src = jsonData[0].photo;

	body.appendChild(name);
	body.appendChild(price);
	body.appendChild(description);
	body.appendChild(img);
}

createDisplay();
