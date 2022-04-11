# Webpack

`require, module.exports` -> **common js** syntax modules  

`import ... from, export` -> **es modules** syntax  

`"build": "webpack --mode=development"` - starts from the entry point (index.js) and builds everything related into `/dist/main.js` **bundle**  
<br/><br/>


# ESBuild
_(transpiles + bundles code in the browser instead of on the server)_  

`npm i esbuild-wasm` - esbuild that runs in the browser a compiled (from Go lang) web assembly (wasm) binary that has a bundler. WA is generally very fast.  

_We copy the `esbuild.wasm` file from `node_modules/esbuild-wasm/` into the `public/` folder of the project so it could be easily fetched by the browser_