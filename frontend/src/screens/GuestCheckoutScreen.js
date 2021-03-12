import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { savePaymentMethod } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'

const GuestCheckoutScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [city, setCity] = useState(shippingAddress.city)
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100

  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error: orderError } = orderCreate

  useEffect(() => {
    if (shippingAddress) {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      )
    }

    if (success) {
      history.push(`/order/${order._id}`)
    }

    // we use the comment below to ignore the warning error. this is because order technically doesn't exist yet
    // eslint-disable-next-line
  }, [history, success, shippingAddress])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, phoneNumber, country }))
    dispatch(savePaymentMethod(paymentMethod))
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <h3>Shipping Address</h3>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Phone Number'
                value={phoneNumber}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <h3>Payment Method</h3>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>

              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                {/*<Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>*/}
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Button
          type='submit'
          style={{ backgroundColor: 'black', color: '#ed9003' }}
        >
          Continue
        </Button>
      </Form>
    </>
  )
}

export default GuestCheckoutScreen
