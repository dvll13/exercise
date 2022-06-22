const path = require('path') // available in a node.js env
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    // filename: 'bundle.[contenthash].js', // generate an unique hash on every build for caching purposes
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // __dirname - available globally in a node.js env
  },
  devtool: 'none', // don't generate source maps
  // get applied on a per-file level:
  module: {
    rules: [
      // to tell Webpack what to do with TS files (=== modules):
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  // here we tell Webpack which file extensions to add to the files to the imports it finds (by default it looks fo .js files)
  resolve: {
    extensions: ['.ts', '.js'] // will bundle all files with these extensions together which are importing, together
  },

  // get applied to the general workflow:
  plugins: [
    new CleanPlugin.CleanWebpackPlugin() // clean the `dist` folder before every `build`
  ]
}
