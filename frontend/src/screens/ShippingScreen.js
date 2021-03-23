import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useTranslation } from 'react-i18next'
import { saveShippingAddress } from '../actions/cartActions'
import { savePaymentMethod } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'
import head from '../coffee.jpg'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const { t, i18n } = useTranslation()
  const [address, setAddress] = useState(shippingAddress.address)
  const [paymentMethod, setPaymentMethod] = useState(0)
  const [city, setCity] = useState(shippingAddress.city)
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)

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
        shippingAddress: { address, city, phoneNumber },
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
                {t('shipping')}
              </h4>
              <Form.Group controlId='address'>
                <Form.Label>{t('address')}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='city'>
                <Form.Label>{t('city')}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter City'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='phoneNumber'>
                <Form.Label>{t('phone')}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Phone Number'
                  value={phoneNumber}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={5}>
              <h4
                style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}
                className='text-center '
              >
                {t('payment')}
              </h4>
              <Form.Group style={{ marginLeft: '30px', marginTop: '30px' }}>
                <Col style={{ marginLeft: '30px', marginTop: '30px' }}>
                  <Form.Check
                    type='radio'
                    label='KNET'
                    id='PayPal'
                    name='paymentMethod'
                    value={1}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value)
                    }}
                  ></Form.Check>
                </Col>
                <Col style={{ marginLeft: '30px', marginTop: '30px' }}>
                  <Form.Check
                    type='radio'
                    //label={head}
                    label='VISA/MASTER'
                    id='PayPal'
                    name='paymentMethod'
                    value={2}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value)
                    }}
                  ></Form.Check>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row className='justify-content-center' md={12}>
            <Button
              type='submit'
              style={{ backgroundColor: 'black', color: '#ed9003' }}
            >
              {t('continue')}
            </Button>
          </Row>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
