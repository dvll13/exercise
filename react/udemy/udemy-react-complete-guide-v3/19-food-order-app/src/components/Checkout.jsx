import { use, useActionState } from 'react'
import Modal from '../UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Input from '../UI/Input'
import Button from '../UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import useHttp from '../hooks/useHttp'
import Error from './Error'

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}

export default function Checkout() {
  const cartCtx = use(CartContext)
  const userProgressCtx = use(UserProgressContext)

  const {
    data,
    //  isLoading,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig)

  const totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price
  }, 0)

  function handleClose() {
    userProgressCtx.hideCheckout()
  }

  function handleFinish() {
    userProgressCtx.hideCheckout()
    cartCtx.clearCart()
    clearData()
  }

  // function handleSubmit(e) {
  //   e.preventDefault()

  //   const formData = new FormData(e.target)
  //   // const name = formData.get('name')
  //   // const email = formData.get('email')
  //   // const street = formData.get('street')
  //   // const postalCode = formData.get('postal-code')
  //   // const city = formData.get('city')

  //   const customerData = Object.fromEntries(formData.entries())

  //   sendRequest(
  //     JSON.stringify({
  //       order: {
  //         items: cartCtx.items,
  //         customer: customerData,
  //       },
  //     }),
  //   )

  //   // fetch('http://localhost:3000/orders', {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' }, // the sent data will be in json format
  //   //   body: JSON.stringify({
  //   //     order: {
  //   //       items: cartCtx.items,
  //   //       customer: customerData,
  //   //     },
  //   //   }),
  //   // })
  // }

  // async function checkoutAction(formData) {
  async function checkoutAction(_prevState, formData) {
    const customerData = Object.fromEntries(formData.entries())

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    )
  }

  const [_formState, formAction, isLoading] = useActionState(checkoutAction, null)

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  )

  if (isLoading) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
        <h2>Success</h2>
        <p>Your order has been submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <form action={checkoutAction}> */}
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(totalPrice)}</p>

        <Input type="text" label="Full Name" id="name" />
        <Input type="email" label="E-Mail Address" id="email" />
        <Input type="text" label="Street" id="street" />
        <div className="control-row">
          <Input type="text" label="Postal code" id="postal-code" />
          <Input type="text" label="City" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  )
}
