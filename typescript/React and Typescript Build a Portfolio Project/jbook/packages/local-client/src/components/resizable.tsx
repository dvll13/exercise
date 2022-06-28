import './resizable.css'
import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children?: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const getMaxWidth = () => window.innerWidth * 0.75
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(getMaxWidth())

  useEffect(() => {
    let timer: any

    const listener = () => {
      // debounce technique
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
        // workaround for a ResizableBox bug where maxConstraints don't get respected
        const maxWidth = getMaxWidth()
        if (maxWidth < width) {
          setWidth(maxWidth)
        }
      }, 100)
    }

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resizableProps: ResizableBoxProps =
    direction === 'horizontal'
      ? {
          className: 'resize-horizontal',
          height: Infinity,
          width,
          resizeHandles: ['e'],
          maxConstraints: [getMaxWidth(), Infinity],
          minConstraints: [innerWidth * 0.2, Infinity],
          onResizeStop: (event, data) => {
            setWidth(data.size.width) // so the width doesn't get reset after window resize
          }
        }
      : {
          height: 300,
          width: Infinity,
          resizeHandles: ['s'],
          maxConstraints: [Infinity, innerHeight * 0.9],
          minConstraints: [Infinity, 24]
        }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
