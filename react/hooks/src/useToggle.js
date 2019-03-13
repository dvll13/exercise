import React, {useState} from 'react'

export const useToggle = (initialValue) => {
    const [toggleValue, setToggleValue] = useState(initialValue)
    const toggler = () => setToggleValue(!toggleValue)

    return [toggleValue, toggler]
}