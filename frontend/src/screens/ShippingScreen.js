import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Col,
  Row,
  Dropdown,
  ButtonGroup,
  DropdownButton,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useTranslation } from 'react-i18next'
import { saveShippingAddress } from '../actions/cartActions'
import { savePaymentMethod } from '../actions/cartActions'
import { listCityDetails } from '../actions/cityAction'

import { createOrder } from '../actions/orderActions'
import head from '../coffee.jpg'
import { CART_RESET_ITEMS } from '../constants/cartConstants'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [title, setTitle] = useState('Select City')
  const { t, i18n } = useTranslation()
  const [address, setAddress] = useState(shippingAddress.address)
  const [cityCode, setCityCode] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState(0)
  const [city, setCity] = useState(shippingAddress.city)
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)

  const dispatch = useDispatch()

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = 0

  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  const cityDetails = useSelector((state) => state.cityDetails)
  const { loading, error: cityError, citydetails } = cityDetails

  let flag = true

  useEffect(() => {
    if (flag && cityCode) {
      flag = false
      dispatch(listCityDetails(cityCode))
    }

    if (success) {
      dispatch({ type: CART_RESET_ITEMS })
      history.push(`/order/${order._id}`)
    }
  }, [dispatch, success, history])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(city)
    cart.shippingPrice =
      city === 'Om AL-Himan' ||
      city === 'ام الهيمان' ||
      city === 'Ahmadi' ||
      city === 'الأحمدي' ||
      city === 'مدينة صباح الأحمد' ||
      city === 'Sabah Al-Ahmad City'
        ? 4.5
        : 1.75

    const governorate = citydetails.name[i18n.language]
    //const governorate = 'ggghh'
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: { address, governorate, city, phoneNumber },
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
    dispatch({ type: CART_RESET_ITEMS })
  }

  return (
    <>
      <FormContainer style={{ marginTop: '2rem' }}>
        <Form onSubmit={submitHandler}>
          <Row style={{ marginTop: '2rem' }}>
            <Col>
              <h4
                style={{ marginTop: '0.5rem', marginBottom: '3rem' }}
                className='text-center '
              >
                {t('shipping')}
              </h4>
              <Form.Group as={Row}>
                <Col>
                  <Form.Label>Governorate</Form.Label>
                </Col>
                <Col>
                  <DropdownButton
                    id='dropdown-item-button'
                    variant='light'
                    style={{ color: 'black' }}
                    title={t('city' + cityCode)}
                  >
                    <Dropdown.Item
                      eventKey='1'
                      value={1}
                      as='button'
                      onClick={(e) => {
                        setCityCode(e.target.value)

                        dispatch(listCityDetails(e.target.value))
                      }}
                    >
                      {t('city1')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='2'
                      value={2}
                      as='button'
                      onClick={(e) => {
                        setCityCode(e.target.value)

                        dispatch(listCityDetails(e.target.value))
                      }}
                    >
                      {t('city2')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='3'
                      value={3}
                      as='button'
                      onClick={(e) => {
                        setCityCode(e.target.value)

                        dispatch(listCityDetails(e.target.value))
                      }}
                    >
                      {t('city3')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='4'
                      value={4}
                      as='button'
                      onClick={(e) => {
                        setCityCode(e.target.value)

                        dispatch(listCityDetails(e.target.value))
                      }}
                    >
                      {t('city4')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='5'
                      value={5}
                      as='button'
                      onClick={(e) => {
                        setCityCode(e.target.value)

                        dispatch(listCityDetails(e.target.value))
                      }}
                    >
                      {t('city5')}
                    </Dropdown.Item>

                    <Dropdown.Item
                      eventKey='6'
                      value={6}
                      as='button'
                      onClick={(e) => {
                        setCityCode(e.target.value)

                        dispatch(listCityDetails(e.target.value))
                      }}
                    >
                      {t('city6')}
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Form.Group>

              <Form.Group controlId='city' as={Row}>
                <Col>
                  <Form.Label>{t('city')}</Form.Label>
                </Col>
                <Col>
                  <DropdownButton
                    id='dropdown-item-button'
                    variant='light'
                    aria-setsize={3}
                    style={{
                      color: 'black',
                    }}
                    title={title}
                  >
                    {citydetails.places &&
                      citydetails.places.map((p) => (
                        <Dropdown.Item
                          value={p[i18n.language]}
                          as='button'
                          onClick={(e) => {
                            setCity(e.target.value)
                            setTitle(e.target.value)
                          }}
                        >
                          {p[i18n.language]}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                </Col>
              </Form.Group>
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
              <Form.Group
                style={{ marginLeft: '30px', marginTop: '30px' }}
                dir='ltr'
              >
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
                <Col style={{ marginLeft: '30px', marginTop: '30px' }}>
                  <Form.Check
                    type='radio'
                    label='CASH'
                    name='paymentMethod'
                    value={3}
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
