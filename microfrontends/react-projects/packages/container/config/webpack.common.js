module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // if ends with .mjs or .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // @babel/preset-react - babel will process all JSX tags
            // @babel/preset-env - all modern syntax will be converted to ES5
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // @babel/plugin-transform-runtime - will add in some additional code to enable additional features in the browser like async/await syntax, etc.
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
}
