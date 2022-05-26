import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

let service: esbuild.Service

const bundle = async (rawCode: string) => {
  // const result = await serviceRef.current.transform(input, {
  //   loader: 'jsx',
  //   target: 'es2015'
  // })

  // console.log('Bundling started...')
  // console.time('Bundling time')
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"', // replace process.env.NODE_ENV with "production" - fixes some warnings and now some dev code gets excluded from the bundle
        global: 'window'
      },
      // to avoid collisions with manually imported react by the user (ESBuild will then intelligently assign one react package to two variables (React and _React))
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment'
    })
    console.log('Bundling result:', result)

    return {
      code: result.outputFiles[0].text,
      error: ''
    }
  } catch (error: any) {
    return {
      code: '',
      error: error.message
    }
  } finally {
    // console.timeEnd('Bundling time')
  }
}

export default bundle
