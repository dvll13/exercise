import React, {useState} from 'react'

export const useToggle = (initialValue) => {
    const [toggleValue, setToggleValue] = useState(initialValue)
    //Though creating functions at each render is not slow in modern browsers we can avoid that by memoizing the toggler function (https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render). For this purpose useCallback hook comes in handy. More details can be found on https://reactjs.org/docs/hooks-reference.html#usecallback.
    const toggler = () => useCallback(() => setToggleValue(!toggleValue))

    return [toggleValue, toggler]
}
