import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    pendingBackendSave: false,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
      state.totalQuantity++
      state.pendingBackendSave = true
    },
    removeItem(state, action) {
      const itemId = action.payload
      const existingItem = state.items.find((item) => item.id === itemId)

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id === itemId)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
      state.totalQuantity--
      state.pendingBackendSave = true
    },
    replaceCart(state, action) {
      state.items = action.payload.items
      state.totalQuantity = action.payload.totalQuantity
      state.pendingBackendSave = false
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice
