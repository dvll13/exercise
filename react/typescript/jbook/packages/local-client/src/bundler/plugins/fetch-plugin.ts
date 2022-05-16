import axios from 'axios'
import * as esbuild from 'esbuild-wasm'
import localForage from 'localforage'

const fileCache = localForage.createInstance({
  name: 'file-cache'
})

// ;(async () => {
//   await fileCache.setItem('color', 'red')
//   const color = await fileCache.getItem('color')
//   console.log(color)
// })()

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',

    setup(build: esbuild.PluginBuild) {
      // 2. overrides ESBuild's natural way of loading a file (instead of reading it directly from the filesystem)
      // runs only upon the files from that namespace
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode
        } // if ESBuild encounters an `import` in the file then it repeats the steps
      })

      // if the onLoad doesn't return ESBuild continues with the next onLoad, until it gets some config object returned
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check to see if we have already fetched and cached this file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)
        // getItem is a generic fn so we can define what type of value it returns with <...>

        // and if it is in the CACHE, then return it immediately
        if (cachedResult) {
          return cachedResult
        }
      })

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        // since currently ESBuild doesn't want to create a css bundle file when it doesn't have a filesystem access, we need to implement a workaround:
        const escaped = data
          .replace(/\n/g, '') // replace new lines with an empty string
          .replace(/"/g, '\\"') // replace " with \"
          .replace(/'/g, "\\'") // same with '

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname // where we found the last file
        }

        // store response in cache
        await fileCache.setItem(args.path, result)

        return result
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname // where we found the last file
        }

        await fileCache.setItem(args.path, result)

        return result
      })
    }
  }
}
