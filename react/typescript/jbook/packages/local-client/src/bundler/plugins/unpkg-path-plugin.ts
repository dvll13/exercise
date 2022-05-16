import * as esbuild from 'esbuild-wasm'

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin', // just for debugging purposes
    // 1. overrides the natural process of ESBuild to figure out where the file is stored
    setup(build: esbuild.PluginBuild) {
      // handle root entry file on index.js
      // filter - the file type/s the resolve should run on
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        // namespace - specific files can be applied in it and onLoad can be applied only on them
        return { path: 'index.js', namespace: 'a' }
      })

      // handle relative paths in a module (if we have './' or '../')
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, unpkgURL + args.resolveDir + '/').href // resolveDir - where we found the last file
        }
      })

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `${unpkgURL}/${args.path}`
        }
      })
    }
  }
}

const unpkgURL = 'https://unpkg.com'

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
