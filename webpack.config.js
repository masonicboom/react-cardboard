var path = require('path');

// Output config.
module.exports = {
	entry: path.join(__dirname, "built", "app.js"),
	output: {
		path: path.join(__dirname, 'www'),
		filename: "app.js"
	},
	resolve: {
		extensions: ["", ".js"],
		alias: {
			react: path.resolve('./node_modules/react'),
			three: path.resolve('./node_modules/three'),
		},
	}
};
