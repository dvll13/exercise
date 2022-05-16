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



# NPM
* `commander` - 

* `lerna` ([exercise\react\typescript\jbook\packages](..%5Creact%5Ctypescript%5Cjbook)) - a tool for managing multi-package projects  
  * `lerna init` - init a lerna project
  * `lerna add` - __must__ be used instead of `npm i` so the links between modules wouldn't get broken.  
    * `lerna add module-1` - install `module-1` in all packages
    * `lerna add module-1 --scope=module-2` - installs `module-1` to `module-2`  

* `ts-node` - compile ts to js and run it (`ts-node index.ts` -> `index.ts => index.js; node index.js`)
<br/><br/><br/>



# NODE
<br/><br/><br/>
