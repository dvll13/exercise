import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const serviceRef = useRef<any>()

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    if (!serviceRef.current) return

    const result = await serviceRef.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    })

    setCode(result.code)
  }

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
