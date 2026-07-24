import { use } from 'react'
import CartContext from '../store/CartContext'
import Modal from '../UI/Modal'
import { currencyFormatter } from '../util/formatting'
import Button from '../UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import CartItem from './CartItem'

export default function Cart() {
  const { items } = use(CartContext)
  const userProgressCtx = use(UserProgressContext)

  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price
  }, 0)

  function handleCartClose() {
    userProgressCtx.hideCart()
  }
  function handleGoToCheckout() {
    userProgressCtx.showCheckout()
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleCartClose : null}
    >
      <h2>Your cart</h2>
      <ul>
        {items.map((i) => (
          <CartItem item={i} key={i.id} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCartClose}>
          Close
        </Button>
        {items?.length > 0 && <Button onClick={handleGoToCheckout}>Go to checkout</Button>}
      </p>
    </Modal>
  )
}
