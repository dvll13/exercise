import './preview.css'
import { useEffect, useRef } from 'react'

interface PreviewProps {
  code: string
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>()

  useEffect(() => {
    iframeRef.current.srcdoc = html // reset the contents of the iframe every time
    iframeRef.current.contentWindow.postMessage(code, '*')
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe ref={iframeRef} title="Preview" srcDoc={html} sandbox="allow-scripts" />
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
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red"><h4>Runtime Error: </h4>' + err + '</div>'
              console.error(err)
            }
          }, false)
        </script>
      </body>
    </html>
  `

export default Preview
