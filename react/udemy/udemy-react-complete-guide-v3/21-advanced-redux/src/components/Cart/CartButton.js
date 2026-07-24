import { useDispatch, useSelector } from 'react-redux'
import classes from './CartButton.module.css'
import { cartUiActions } from '../../store/ui-slice'

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  function handleToggleCart() {
    dispatch(cartUiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cart.totalQuantity}</span>
    </button>
  )
}

export default CartButton
