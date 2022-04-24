import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const serviceRef = useRef<any>()
  const buttonRef = useRef<any>()

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService()
    buttonRef.current.focus()
  }, [])

  const onClick = async () => {
    if (!serviceRef.current) return

    // const result = await serviceRef.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015'
    // })

    const result = await serviceRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"', // fixes some warnings and now some dev code gets excluded from the bundle
        global: 'window'
      }
    })

    console.log(result)

    setCode(result.outputFiles[0].text)

    try {
      eval(result.outputFiles[0].text)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '80%', height: 200 }}
      ></textarea>
      <div>
        <button onClick={onClick} ref={buttonRef}>
          Submit
        </button>
      </div>
      <pre>{code}</pre>
      <iframe src="/test.html" title="test title" sandbox="" />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
