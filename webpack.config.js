var path = require('path');
var webpack = require('webpack');

// Output config.
module.exports = {
	entry: path.join(__dirname, "built", "app.js"),
	output: {
		path: path.join(__dirname, 'www'),
		filename: "app.js"
	},
	resolve: {
		extensions: ["", ".js"]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};
