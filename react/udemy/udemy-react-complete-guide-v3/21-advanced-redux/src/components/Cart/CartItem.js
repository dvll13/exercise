import { useDispatch } from 'react-redux'
import classes from './CartItem.module.css'
import { cartActions } from '../../store/cart-slice'

const CartItem = ({ item }) => {
  const { id, name, quantity, totalPrice, price } = item
  const dispatch = useDispatch()

  function handleAddCartItem() {
    dispatch(cartActions.addItem({ id, name, quantity, totalPrice, price }))
  }

  function handleRemoveCartItem() {
    dispatch(cartActions.removeItem(id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)} <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveCartItem}>-</button>
          <button onClick={handleAddCartItem}>+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
