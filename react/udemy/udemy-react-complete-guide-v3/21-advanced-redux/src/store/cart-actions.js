import { cartActions } from './cart-slice'
import { cartUiActions } from './ui-slice'

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://udemy-react-21-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
      )

      if (!response.ok) {
        throw new Error('Could not fetch cart data.')
      }

      const data = response.json()

      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCart({
          items: cartData.items,
          totalQuantity: cartData.totalQuantity,
        }),
      )
    } catch (error) {
      dispatch(
        cartUiActions.showNotification({
          status: 'error',
          title: 'Error.',
          message: 'Error sending cart data!',
        }),
      )
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartUiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      }),
    )

    const sendRequest = async () => {
      const response = await fetch(
        'https://udemy-react-21-redux-async-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }),
        },
      )

      if (!response.ok) {
        throw new Error('Error sending data.')
      }
    }

    try {
      await sendRequest()

      dispatch(
        cartUiActions.showNotification({
          status: 'success',
          title: 'Success.',
          message: 'Sending cart data successfully!',
        }),
      )
    } catch (error) {
      dispatch(
        cartUiActions.showNotification({
          status: 'error',
          title: 'Error.',
          message: 'Error sending cart data!',
        }),
      )
    }
  }
}
