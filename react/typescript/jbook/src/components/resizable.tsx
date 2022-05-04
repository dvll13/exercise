import './resizable.css'
import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children?: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)

  useEffect(() => {
    const listener = () => {
      setInnerWidth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [])

  const resizableProps: ResizableBoxProps =
    direction === 'horizontal'
      ? {
          className: 'resize-horizontal',
          height: Infinity,
          width: window.innerWidth * 0.75,
          resizeHandles: ['e'],
          maxConstraints: [innerWidth * 0.75, Infinity],
          minConstraints: [innerWidth * 0.2, Infinity]
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
