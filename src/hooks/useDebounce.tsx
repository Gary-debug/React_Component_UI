import React, {useEffect, useState} from "react";

function useDebounce(value: any, delay = 300) {
  const [ debouncedValue, setDebouncedValue ] = useState(value)
  useEffect(() => {
    const handlder = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handlder)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce