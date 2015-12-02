var path = require('path');
var webpack = require('webpack');

// Output config.
module.exports = {
	entry: {
		object: path.join(__dirname, "built", "object.js"),
		panorama: path.join(__dirname, "built", "panorama.js"),
	},
	output: {
		path: path.join(__dirname, 'www'),
		filename: "[name]/app.js"
	},
	resolve: {
		extensions: ["", ".js"]
		/*
		// NOTE: these are needed when using npm link to run a local fork of react-three.
		alias: {
			react: path.resolve('./node_modules/react'),
			three: path.resolve('./node_modules/three'),
		}*/
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};
