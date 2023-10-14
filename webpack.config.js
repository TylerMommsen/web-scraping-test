const path = require('path');

module.exports = {
	entry: './display.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
