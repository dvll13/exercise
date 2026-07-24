import { createContext, useReducer } from 'react'

// added just for code completion
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
})

// the goal of the reducer fn is to return an updated state
function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingCartItemIdx = state.items.findIndex((i) => i.id === action.item.id)
    const updatedItems = [...state.items]

    if (existingCartItemIdx > -1) {
      const existingItem = state.items[existingCartItemIdx]
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 }
      updatedItems[existingCartItemIdx] = updatedItem
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIdx = state.items.findIndex((i) => i.id === action.id)
    const existingCartItem = state.items[existingCartItemIdx]
    let updatedItems = [...state.items]

    if (existingCartItem.quantity === 1) {
      // updatedItems = state.items.filter((i) => i.id !== action.id)
      updatedItems.splice(existingCartItemIdx, 1) // removes an element from the array, and optionally adds new elements on their place. returns the removed element.
    } else {
      const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 }
      updatedItems[existingCartItemIdx] = updatedItem
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] }
  }

  return state
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] }) // <- initial state; cart - current cart state

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
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  }

  return <CartContext value={cartContext}>{children}</CartContext>
}

export default CartContext
