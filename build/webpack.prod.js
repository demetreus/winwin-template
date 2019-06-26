const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base');

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	optimization: {
		minimizer: [
		  	new UglifyJsPlugin({
				uglifyOptions: {
			 		 output: {
						comments: false,
			  		},
				},
		  	}),
		],
	},
  	plugins: []
});

module.exports = new Promise((resolve, reject) => {
  	resolve(buildWebpackConfig);
});