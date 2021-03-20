import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Modal,
  Container,
} from 'react-bootstrap'
import { login } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
  const { t, i18n } = useTranslation()
  const productId = match.params.id
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleClose = () => setShow(false)

  const handleGuest = () => {
    history.push('/shipping')
    //history.push('/guestcheckout')
  }

  const checkoutHandled = () => {
    if (userInfo) {
      history.push('/shipping')
    } else {
      setShow(true)
    }
  }

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    setShow(false)
    if (userInfo) {
      history.push('/shipping')
    }
  }
  return (
    <Row>
      <Col md={8}>
        <h1
          className='text-center'
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          {t('Shopping-Cart')}
        </h1>
        {cartItems.length === 0 ? (
          <Message> {t('empty-Cart')}</Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.product}
                //style={{ borderColor: 'black', borderWidth: '2px' }}
              >
                <Row>
                  <Col md={2} xs={2} sm={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      //className='image'
                    />
                  </Col>
                  <Col md={3} xs={3} sm={3} className='center'>
                    <Link className='mr-auto' to={`/product/${item._id}`}>
                      <h6>{item.name['i18n.language']}</h6>
                    </Link>
                  </Col>
                  <Col md={2} xs={2} sm={2} className='center'>
                    <small>{item.price} KD</small>
                  </Col>
                  <Col md={2} xs={3} sm={3} className='center'>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} xs={2} sm={2} className='center'>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} style={{ marginTop: '2rem' }}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='text-center'>
                {t('item', {
                  val: cartItems.reduce((acc, item) => acc + item.qty, 0),
                })}
              </h2>

              <h6 className='text-center'>
                {t('total', {
                  val: cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(3),
                })}
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                style={{ backgroundColor: 'black', color: '#ed9003' }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandled}
              >
                {t('Proceed')}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: 'black',
            color: '#ed9003',
          }}
        >
          <Modal.Title
            style={{
              backgroundColor: 'black',
              color: '#ed9003',
            }}
          >
            {t('Login')}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={loginHandler}>
          <Modal.Body>
            <Form.Group controlId='email'>
              <Row>
                <Col md={3}>
                  <Form.Label> {t('email')}</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type='email'
                    placeholder='Enter your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId='password'>
              <Row>
                <Col md={3}>
                  <Form.Label>{t('password')}</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    type='password'
                    placeholder='Enter your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              variant='secondary'
              style={{
                backgroundColor: '#ed9003',
                color: 'black',
              }}
            >
              {t('login')}
            </Button>
            <Button
              variant='secondary'
              onClick={handleGuest}
              style={{
                backgroundColor: '#ed9003',
                color: 'black',
              }}
            >
              {t('guest')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Row>
  )
}

export default CartScreen
