import { RefObject, useEffect } from 'react'

export const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const overlay = document.getElementById('overlay') as Node
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !overlay?.contains(event.target as Node)
      ) {
        handler()
      }
    }
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref, handler])
}
