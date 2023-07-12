import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && width === 0 && height === 0) {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
  }, [width, height])

  return { height, width }
}
