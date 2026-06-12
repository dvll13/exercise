/* eslint-disable no-unused-vars */
import { createContext, useReducer } from 'react'

// dummy const for autocompletion
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
})

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemsIndex = state.items.findIndex((item) => item.id === action.item.id)

    const updatedItems = [...state.items]

    if (existingCartItemsIndex > -1) {
      const existingItem = state.items[existingCartItemsIndex]
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      }
      updatedItems[existingCartItemsIndex] = updatedItem
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemsIndex = state.items.findIndex((item) => item.id === action.id)
    const existingCartItem = state.items[existingCartItemsIndex]
    const updatedItems = [...state.items]

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemsIndex, 1)
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      }
      updatedItems[existingCartItemsIndex] = updatedItem
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] }
  }

  return state
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] })

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item })
  }

  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id })
  }

  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' })
  }

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext
