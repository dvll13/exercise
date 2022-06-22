const path = require('path') // available in a node.js env

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    // filename: 'bundle.[contenthash].js', // generate an unique hash on every build for caching purposes
    filename: 'bundle.js', // generate an unique hash on every build for caching purposes
    path: path.resolve(__dirname, 'dist'), // __dirname - available globally in a node.js env
    publicPath: 'dist' // required for the dev server
  },
  // this tells Webpack that there'll be generated source maps already, which it should extract and wire up correctly to the bundle it generates
  devtool: 'inline-source-map',
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
  }
}
