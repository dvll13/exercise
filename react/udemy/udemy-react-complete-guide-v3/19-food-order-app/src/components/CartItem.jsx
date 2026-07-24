import { use } from 'react'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'

export default function CartItem({ item }) {
  const cartCtx = use(CartContext)

  function handleIncreaseQuantity() {
    cartCtx.addItem(item)
  }

  function handleDecreaseQuantity() {
    cartCtx.removeItem(item.id)
  }

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)} ={' '}
        {currencyFormatter.format(item.quantity * item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={handleDecreaseQuantity}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncreaseQuantity}>+</button>
      </p>
    </li>
  )
}
