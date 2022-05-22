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

* `esbuild-wasm` ([react/typescript/jbook](..%5Creact%5Ctypescript%5Cjbook%5Csrc)) - This is the cross-platform WebAssembly binary for `esbuild`, a JavaScript bundler and minifier.

* `parcel-bundler` - helps run TS in the browser (`parcel index.html` - starts the server and when it sees a ts file, it auto converts it to js)
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

* `ts-node` - compile ts to js and run it (`ts-node index.ts` -> `index.ts => index.js; node index.js`)
<br/><br/><br/>



# NODE  

* `cors` - ([exercise\react\typescript\jbook\packages\local-api](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api)) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

* `express` ([exercise\react\typescript\jbook\packages\local-api\src\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Cindex.ts)) - Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes.
  * `Static Middleware` ([exercise\react\typescript\jbook\packages\local-api\src\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Cindex.ts)) - it's included in `express` by default. It can **serve all files and folders inside a directory**. An example of this is the `public` directory of the app  
  * `express.Router()` - [exercise\react\typescript\jbook\packages\local-api\src\routes\cells.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Croutes)
  * `router.use(express.json())` - use request body-parsing middleware
  
* `http-proxy-middleware` ([exercise\react\typescript\jbook\packages\local-api\src\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Cindex.ts)) - Node.js proxying made simple. Configure proxy middleware with ease for connect, express, browser-sync and many more.
<br/><br/><br/>
