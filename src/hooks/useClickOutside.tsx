import { event } from "jquery";
import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handlder: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return 
      }
      handlder(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handlder])
}

export default useClickOutside;