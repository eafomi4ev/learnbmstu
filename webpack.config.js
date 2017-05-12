let NODE_ENV = process.env.NODE_ENV || 'development';
let webpack = require('webpack');
let path = require('path');

module.exports = {
	entry: './public/js/vuerender.js',
	output: {
		filename: './public/js/bundle.js',
	},
	devtool: NODE_ENV === 'development' ? 'source-map' : null,
	watch: NODE_ENV === 'development',
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
		}),
	],
	resolve: {
		modules: ['node_modules'],
	},
	module: {
		rules: [{
			test: /\.js$/,
      include: [
        path.resolve(__dirname, 'delete'),
      ],
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env'],
				},
			},
		}],
	},
};
