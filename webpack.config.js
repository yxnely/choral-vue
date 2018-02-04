const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let appName = 'app';
let plugins = [];
const env = process.env.WEBPACK_ENV;
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	CSS: path.resolve(__dirname, 'src/css'),
	JS: path.resolve(__dirname, 'src/js'),
};

if (env === 'production') {
	const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

	plugins.push(new UglifyJsPlugin({ minimize: true }));
	plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}
  ));

	appName = appName + '.min.js';
} else {
	appName = appName + '.js';
}

module.exports = {
	entry: path.join(paths.JS, 'app.js'),
	output: {
		path: paths.DIST,
		filename: appName,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'index.html'),
		}),
		new ExtractTextPlugin('style.bundle.css'),
		...plugins,
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			  },
		],
		loaders: [
			{
			  test: /\.vue$/,
			  loader: 'vue'
			}, 
			{
				test: /\.s[a|c]ss$/,
				loader: 'style!css!sass'
			}
		],
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
};