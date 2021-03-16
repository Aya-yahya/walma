import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'

import { saveShippingAddress } from '../actions/cartActions'
import { savePaymentMethod } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'

const ShippingScreen = ({ history }) => {
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

  cart.shippingPrice = 2

  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
  }, [success, history])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: { address, city, phoneNumber, country },
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <FormContainer style={{ marginTop: '2rem' }}>
        <Form onSubmit={submitHandler}>
          <Row style={{ marginTop: '2rem' }}>
            <Col>
              <h4
                style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}
                className='text-center '
              >
                Shipping Address
              </h4>
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
              <h4
                style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}
                className='text-center '
              >
                Payment Method
              </h4>
              <Form.Group>
                <Col className='center'>
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
          <Row className='justify-content-center' md={12}>
            <Button
              type='submit'
              style={{ backgroundColor: 'black', color: '#ed9003' }}
            >
              Continue
            </Button>
          </Row>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
