import './preview.css'
import { useEffect, useRef } from 'react'

interface PreviewProps {
  code: string
  bundlingError: string
}

const Preview: React.FC<PreviewProps> = ({ code, bundlingError }) => {
  const iframeRef = useRef<any>()

  useEffect(() => {
    iframeRef.current.srcdoc = html // reset the contents of the iframe every time
    iframeRef.current.onload = () => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }
    // setTimeout(() => {
    //   iframeRef.current.contentWindow.postMessage(code, '*')
    // }, 50)
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe ref={iframeRef} title="Preview" srcDoc={html} sandbox="allow-scripts" />
      {bundlingError && <div className="preview-error">{bundlingError}</div>}
    </div>
  )
}

const html = `
    <html>
      <head>
        <style>html {background-color: white}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root')
            root.innerHTML = '<div style="color: red"><h4>Runtime Error: </h4>' + err + '</div>'
            console.error(err)
          }

          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) { // synchronous errors
              handleError(err)
            }
          }, false)

          // for ASYNC errors
          window.addEventListener('error', (event) => {
            event.preventDefault() // so the browser doesn't print the error
            handleError(event.error)
          })
        </script>
      </body>
    </html>
  `

export default Preview
