import { createContext, useState } from 'react'

const UserProgressContext = createContext({
  progress: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
})

export function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState('')

  function showCart() {
    setProgress('cart')
  }

  function hideCart() {
    setProgress('')
  }

  function showCheckout() {
    setProgress('checkout')
  }

  function hideCheckout() {
    setProgress('')
  }

  console.log(progress)

  return (
    <UserProgressContext.Provider value={{ progress, showCart, hideCart, showCheckout, hideCheckout }}>
      {children}
    </UserProgressContext.Provider>
  )
}

export default UserProgressContext
