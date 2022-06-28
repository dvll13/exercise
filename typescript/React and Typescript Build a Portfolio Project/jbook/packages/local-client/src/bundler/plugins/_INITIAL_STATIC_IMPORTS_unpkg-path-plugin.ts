import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin', // just for debugging purposes
    // 1. overrides the natural process of ESBuild to figure out where the file is stored
    setup(build: esbuild.PluginBuild) {
      // filter - the file type/s the resolve should run on
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args)
        // namespace - specific files can be applied in it and onLoad can be applied only on them
        return { path: args.path, namespace: 'a' }
      })

      // 2. overrides ESBuild's natural way of loading a file (instead of reading it directly from the filesystem)
      // runs only upon the files from that namespace
      build.onLoad({ filter: /.*/, namespace: 'a' }, async (args: any) => {
        console.log('onLoad', args)

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message'; 
              console.log(message);
            `
          } // if ESBuild encounters an `import` in the file then it repeats the steps
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"'
          }
        }
      })
    }
  }
}

/* CONSOLE.LOG:
unpkg-path-plugin.ts:9 onResole 
{path: 'index.js', importer: '', namespace: '', resolveDir: ''}

unpkg-path-plugin.ts:15 onLoad 
{path: 'index.js', namespace: 'a'}

unpkg-path-plugin.ts:9 onResole 
{path: './message', importer: 'index.js', namespace: 'a', resolveDir: ''}

unpkg-path-plugin.ts:15 onLoad 
{path: './message', namespace: 'a'}

index.tsx:37 
{warnings: Array(0), outputFiles: Array(1)}
*/
