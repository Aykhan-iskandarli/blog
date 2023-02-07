import React, { useEffect, useState } from 'react'

const useDebounce = ( value:any, delay : any) => {
    const [debounceValue, setDebounceValue] = useState<any>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounceValue
}

export default useDebounce