import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'
import { fetchCartData, sendCartData } from './store/cart-actions'

let isInitialLoading = true

function App() {
  const dispatch = useDispatch()
  const { cartIsVisible: isCartVisible, notification } = useSelector((state) => state.ui)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitialLoading) {
      isInitialLoading = false
      return
    }

    if (cart.pendingBackendSave) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  return (
    <>
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App
