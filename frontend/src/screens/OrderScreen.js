import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Badge,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // we use javascript to dynamically add a script like the one here https://developer.paypal.com/docs/checkout/reference/customize-sdk/
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || order._id !== orderId || successDeliver) {
      //reset the order page to not have the effect loop infinitely
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      // lets us see order details before order comes in and after we pay
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      // load paypal script if order is not paid
      if (!window.paypal) {
        addPayPalScript()
      }
    } else {
      setSdkReady(true)
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo])

  /*
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successPay])*/

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h3>Order: {order._id}</h3>
      {order.user ? (
        <>
          <p>
            <strong>Name: </strong>
            {order.user.name}
          </p>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
          </p>
        </>
      ) : (
        <></>
      )}

      <Row>
        <Col md={8}>
          <ListGroup variant='flush' className='center'>
            <ListGroup.Item>
              <h2 className='text-center'>Shipping</h2>
              <h5 className='text-center'>
                {order.isDelivered ? (
                  <Badge pill variant='success'>
                    {' '}
                    Delivered on {order.deliveredAt}
                  </Badge>
                ) : (
                  <Badge pill variant='danger'>
                    Not Delivered
                  </Badge>
                )}
              </h5>

              <p className='text-center'>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className='text-center'>Payment Method</h2>
              <h5 className='text-center'>
                {order.isPaid ? (
                  <Badge pill variant='success'>
                    {'                          '}
                    Paid on {order.paidAt}
                  </Badge>
                ) : (
                  <Badge pill variant='danger'>
                    {'                        '}
                    Not Paid
                  </Badge>
                )}
              </h5>

              <p className='text-center'>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className='text-center'>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2} xs={3} sm={3} className='center'>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3} xs={4} sm={4} className='center'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3} xs={4} sm={4} className='center'>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='text-center'>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='text-center'>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='text-center'>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='text-center'>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='text-center'>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen

/*import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import { listCodeDetails } from '../actions/promoCodesActions'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)
  const [code, setCode] = useState('false')
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  dispatch(getOrderDetails(orderId))

  console.log(order)

  order.itemsPrice = order.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const promocodeDetails = useSelector((state) => state.promocodeDetails)
  const { code: promocode } = promocodeDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // we use javascript to dynamically add a script like the one here https://developer.paypal.com/docs/checkout/reference/customize-sdk/
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      }
    } else {
      setSdkReady(true)
    }
    if (order) {
      setTotal(order.totalPrice)
    }
    if (promocode.discount) {
      const t =
        order.itemsPrice -
        order.itemsPrice * promocode.discount +
        order.taxPrice +
        order.shippingPrice
      setTotal(t)
    }
  }, [
    dispatch,
    orderId,
    successPay,
    order,
    successDeliver,
    history,
    userInfo,
    promocode,
  ])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const CodeSubmitHandler = () => {
    dispatch(listCodeDetails(code))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      {order.user ? (
        <>
          <p>
            <strong>Name: </strong>
            {userInfo.name}
          </p>
          <p>
            <strong>Email: </strong>
            <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
          </p>
        </>
      ) : (
        <></>
      )}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country}
              </p>
              {order.isDeliverd ? (
                <Message variant='success'>
                  Delivered on {order.deliverdAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col ms={4}>
                          {item.qty} x {item.price} KD= {item.qty * item.price}{' '}
                          KD
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  {promocode.discount ? (
                    <>
                      <Col>
                        <sub style={{ textDecorationLine: 'line-through' }}>
                          {order.itemsPrice} KD
                        </sub>
                        {'   '}
                        {order.itemsPrice -
                          order.itemsPrice * promocode.discount}{' '}
                        KD
                      </Col>
                    </>
                  ) : (
                    <Col>{order.itemsPrice} KD</Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice} KD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice} KD</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>

                  {promocode.discount ? (
                    <>
                      <Col>
                        <sub style={{ textDecorationLine: 'line-through' }}>
                          {order.totalPrice} KD
                        </sub>
                        {'   '}
                        {order.itemsPrice -
                          order.itemsPrice * promocode.discount +
                          order.taxPrice +
                          order.shippingPrice}{' '}
                        KD
                      </Col>
                    </>
                  ) : (
                    <Col>{order.totalPrice} KD</Col>
                  )}
                </Row>
              </ListGroup.Item>
              {!promocode.discount ? (
                <ListGroup.Item>
                  <InputGroup className='mb-3'>
                    <FormControl
                      placeholder='Add PromoCode'
                      aria-label="Recipient's username"
                      aria-describedby='basic-addon2'
                      onChange={(e) => setCode(e.target.value)}
                      type='text'
                    />
                    <InputGroup.Append>
                      <Button
                        type='button'
                        id='button-addon1'
                        variant='outline-secondary'
                        onClick={() => CodeSubmitHandler()}
                      >
                        Apply
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </ListGroup.Item>
              ) : (
                <></>
              )}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={total}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDeliverd && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen*/