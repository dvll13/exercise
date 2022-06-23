# CSS

* `bulmaswatch` ([react/typescript/jbook](..%5Creact%5Ctypescript%5Cjbook%5Csrc%5Cindex.tsx)) - _Bulma_ is a free, open source framework that provides ready-to-use frontend components that you can easily combine to build responsive web interfaces. _bulmaswatch = bulma + additional themes_ 

* `@fortawesome/fontawesome-free` [react\typescript\jbook\src\index.tsx](..%5Creact%5Ctypescript%5Cjbook%5Csrc%5Cindex.tsx) - Font Awesome is the Internet's icon library and toolkit
<br/><br/><br/>



# REACT

* `@monaco-editor/react` ([react/typescript/jbook](..%5Creact%5Ctypescript%5Cjbook%5Csrc%5Ccomponents%5Ccode-editor.tsx)) - The Monaco Editor is the code editor that powers VS Code. This editor can be used in any React application without needing to use webpack (or rollup/parcel/etc) configuration files / plugins
  
* `localforage` ([react/typescript/jbook](..%5Creact%5Ctypescript%5Cjbook%5Csrc%5Cbundler%5Cplugins%5Cfetch-plugin.ts)) - localForage is a fast and simple storage library for JavaScript. localForage improves the offline experience of your web app by using asynchronous storage (`IndexedDB` or `WebSQL`) with a simple, localStorage-like API

* `react-resizable` ([react/typescript/jbook](..%5Creact%5Ctypescript%5Cjbook%5Csrc%5Ccomponents%5Cresizable.tsx)) - a simple widget that can be resizable by one or more handles  

* `immer` ([react/typescript/jbook](..%5Creact%5Ctypescript%5Cjbook%5Csrc%5Cstate%5Creducers%5CcellsReducer.ts)) - Immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way.
<br/><br/><br/>



# BUNDLERS
* `esbuild` ([exercise\react\typescript\jbook\packages\cli\package.json](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Ccli%5Cpackage.json)) - bundle everything into one file ("scripts": {
    "prepublishOnly": "esbuild src/index.ts --platform=node --outfile=dist/index.js --bundle --minify --define:process.env.NODE_ENV=\\\"production\\\""
  })

* `esbuild-wasm` ([react/typescript/jbook](..%5Creact%5Ctypescript%5Cjbook%5Csrc)) - This is the cross-platform WebAssembly binary for `esbuild`, a JavaScript bundler and minifier.

* `parcel-bundler` - helps run TS in the browser (`parcel index.html` - starts the server and when it sees a ts file, it auto converts it to js)

* `webpack` [exercise\typescript\understanding-ts-2022](../typescript/understanding-ts-2022/project_drag-drop) - bundles and optimizes (minifies) project files, and could add additional build steps & tools
```cli
npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```
  * in the `Drag & Drop` project `Webpack` will be used to **transform** TS code to JS and **emit** a bundle, plus its `dev server` is being used
  * `ts-loader` tells webpack how to **convert** TS to JS
* `clean-webpack-plugin` - clean the build folder before every `build`

_More in [typescript.md#exercise-ts-projects](typescript.md#exercise-ts-projects)_
<br/><br/><br/>



# CLI / NPM (common)

* `commander` - eases and makes the work with the CLI more convenient ([exercise\react\typescript\jbook\packages\cli\src\commands\serve.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Ccli%5Csrc%5Ccommands%5Cserve.ts))
  * it also generates a **help command** that shows to the user all the commands we've implemented

* `lerna` ([exercise\react\typescript\jbook\packages](..%5Creact%5Ctypescript%5Cjbook)) - a tool for managing multi-package projects  
  * `lerna init` - init a lerna project
  * `lerna add` - __must__ be used instead of `npm i` so the links between modules wouldn't get broken.  
    * `lerna add module-1` - install `module-1` in all packages
    * `lerna add module-1 --scope=module-2` - installs `module-1` to `module-2`  
  * `lerna run start --parallel` - runs the `start` script in all packages  
  * `lerna bootstrap` - re-link all packages
  * `lerna publish --no-push`

* `ts-node` - compile ts to js and run it (`ts-node index.ts`: `index.ts => index.js; node index.js`)
<br/><br/><br/>



# NODE / SERVERS

* `body-parser` (exercise\typescript\understanding-ts-2022\node_express\package.json](../typescript/understanding-ts-2022/node_express)) - 

* `cors` - ([exercise\react\typescript\jbook\packages\local-api](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api)) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

* `express` ([exercise\react\typescript\jbook\packages\local-api\src\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Cindex.ts)) - Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes.
  * `Static Middleware` ([exercise\react\typescript\jbook\packages\local-api\src\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Cindex.ts)) - it's included in `express` by default. It can **serve all files and folders inside a directory**. An example of this is the `public` directory of the app  
  * `express.Router()` - [exercise\react\typescript\jbook\packages\local-api\src\routes\cells.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Croutes)
  * `router.use(express.json())` - use request body-parsing middleware
  
* `http-proxy-middleware` ([exercise\react\typescript\jbook\packages\local-api\src\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Cindex.ts)) - Node.js proxying made simple. Configure proxy middleware with ease for connect, express, browser-sync and many more.

* `lite-server` ([exercise\typescript\understanding-ts-2022\Understanding-TS\package.json](..%5Ctypescript%5Cunderstanding-ts-2022%5CUnderstanding-TS%5Cpackage.json)) - Simple and lightweight development only node server that serves a web app, opens it in the browser, refreshes when html or javascript change, injects CSS changes using sockets, and has a fallback page when a route is not found.

* `nodemon` ([exercise\typescript\understanding-ts-2022\node_express\package.json](../typescript/understanding-ts-2022/node_express)) - watch for changes and restarts the node server

<br/><br/><br/>



# UTILS

- `lodash` [exercise\typescript\understanding-ts-2022\3rd-party-libs\src\app.ts](../typescript/understanding-ts-2022/3rd-party-libs/src/app.ts) - A modern JavaScript utility library delivering modularity, performance & extras. For TS projects needs DT: `@types/lodash`

- `class-transformer` ([exercise\typescript\understanding-ts-2022\3rd-party-libs\src](../typescript/understanding-ts-2022/3rd-party-libs/src)) - for TS and JS projects: allows you to transform plain object to some instance of class and versa. Also it allows to serialize / deserialize object based on criteria. 

<br/><br/><br/>



# TYPESCRIPT

- `class-validator` ([exercise\typescript\understanding-ts-2022\3rd-party-libs\src](../typescript/understanding-ts-2022/3rd-party-libs/src)) - validation by using TS decorators