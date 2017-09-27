const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './main.js',
		contact: './contact.js',
		signup: './signup.js',
		blog: './blog.js',
		about: './about.js'
	},

	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['es2015']
				}
			},
			{
				test: /\.(scss|css)$/,

				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			}
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new ExtractTextPlugin('main.[contentHash].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'main',
			filename: 'main-[hash].min.js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'contact',
			filename: 'contact-[hash].min.js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'about',
			filename: 'about-[hash].min.js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'signup',
			filename: 'signup-[hash].min.js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'blog',
			filename: 'blog-[hash].min.js'
		}),
		new HtmlWebpackPlugin({
		 template: path.join(__dirname, 'src', 'default.html'),
		 title: 'Blog',
		 inject: 'body',
		 chunks: ['main','blog'],
		 filename: 'index.html'
	 }),
	 new HtmlWebpackPlugin({
		 template: path.join(__dirname, 'src', 'default.html'),
		 title: 'About',
		 inject: 'body',
		 chunks: ['main','about'],
		 filename: './about/index.html'
	 }),
	 new HtmlWebpackPlugin({
		 template: path.join(__dirname, 'src', 'default.html'),
		 title: 'Contact',
		 inject: 'body',
		 chunks: ['main','contact'],
		 filename: './contact/index.html'
	 })
	]
};

/*

new webpack.optimize.CommonsChunkPlugin({
  name: string, // or
  names: string[],
  // The chunk name of the commons chunk. An existing chunk can be selected by passing a name of an existing chunk.
  // If an array of strings is passed this is equal to invoking the plugin multiple times for each chunk name.
  // If omitted and `options.async` or `options.children` is set all chunks are used, otherwise `options.filename`
  // is used as chunk name.
  // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
  // chunk name here instead of omitting the `option.name`.

  filename: string,
  // The filename template for the commons chunk. Can contain the same placeholders as `output.filename`.
  // If omitted the original filename is not modified (usually `output.filename` or `output.chunkFilename`).
  // This option is not permitted if you're using `options.async` as well, see below for more details.

  minChunks: number|Infinity|function(module, count) -> boolean,
  // The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
  // The number must be greater than or equal 2 and lower than or equal to the number of chunks.
  // Passing `Infinity` just creates the commons chunk, but moves no modules into it.
  // By providing a `function` you can add custom logic. (Defaults to the number of chunks)

  chunks: string[],
  // Select the source chunks by chunk names. The chunk must be a child of the commons chunk.
  // If omitted all entry chunks are selected.

  children: boolean,
  // If `true` all children of the commons chunk are selected

  async: boolean|string,
  // If `true` a new async commons chunk is created as child of `options.name` and sibling of `options.chunks`.
  // It is loaded in parallel with `options.chunks`.
  // Instead of using `option.filename`, it is possible to change the name of the output file by providing
  // the desired string here instead of `true`.

  minSize: number,
  // Minimum size of all common module before a commons chunk is created.
})

*/
