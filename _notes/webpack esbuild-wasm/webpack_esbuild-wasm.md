# Webpack

`require, module.exports` -> **commonjs** syntax modules  

`import ... from, export` -> **es modules** syntax  

`"build": "webpack --mode=development"` - starts from the entry point (`index.js`) and builds everything related into `/dist/main.js` **bundle**  

**`webpack-html-plugin`** - automatically adds in the `public/index.html` the imports to the generated bundle files
```js
{
    plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
```
<br/>

`webpack-merge` - merge webpack configs, e.g. common and dev

_Example **common** config (`webpack.common.js`):_
```js
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
```

_Example **dev** config (`webpack.dev.js`):_
```js
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
```

_In `package.json`:_
```json
"scripts": {
  "start": "webpack serve --config config/webpack.dev.js"
}
```
<br/>

## Babel

- **Presets:**
  - `@babel/preset-react` - babel will process all JSX tags
  - `@babel/preset-env` - all modern syntax will be converted to ES5

- **Plugins:**
  - `@babel/plugin-transform-runtime` - will add in some additional code to enable additional features in the browser like async/await syntax, etc.
  - `clean-webpack-plugin` - clean the build folder before every `build`
  - `ts-loader` - tells webpack how to **convert** TS to JS
<br/><br/>


## Webpack Dev Server
_Takes the output from our webpack process and makes it available in the browser_

[exercise\microfrontends\e-commerce](../../microfrontends/e-commerce)

<br/><br/>


# ESBuild
_(transpiles + bundles code in the browser instead of on the server)_  

`npm i esbuild-wasm` - esbuild that runs in the browser a compiled (from Go lang) web assembly (wasm) binary that has a bundler. WA is generally very fast.  

_We copy the `esbuild.wasm` file from `node_modules/esbuild-wasm/` into the `public/` folder of the project so it could be easily fetched by the browser_


`npm view react dist.tarball` returns the download link for the `react` src archive: `https://nexus.dev.brandmaker.com/repository/npm-bm/react/-/react-18.0.0.tgz`  


`https://unpkg.com/` - unpkg is a fast, global content delivery network for everything on npm. Use it to quickly and easily load any file from any package using a URL like: `unpkg.com/:package@:version/:file`  


_the bundle **size** goes down if we use just common-js or es modules_  

**custom esbuild-wasm plugin**: `plugins/unpkg-path-plugin.ts`