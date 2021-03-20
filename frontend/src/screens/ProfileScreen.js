import React, { useState, useEffect } from 'react'

import {
  //Form,
  Button,
  Row,
  Col,
  Table,
  Container,
  //Modal,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import {
  getUserDetails,
  updateUserProfile,
  login,
} from '../actions/userActions'
import { useTranslation } from 'react-i18next'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = (e) => {
    setShow(true)
  }

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const dispatch = useDispatch()

  const orderListMy = useSelector((state) => state.orderListMy) //grab orderListMy which gets its data from orderListMyReducer...
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy //...then deconstruct and get these from the state

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!userInfo || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        dispatch(listMyOrders())
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))
      dispatch(login(email, password))
    }
    setShow(false)
  }
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Row>
        <Col md={3} className='text-center'>
          <h2>{t('profile')}</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          <Container>
            <p>
              <i className='far fa-user-circle fa-5x' id='adminmenu'></i>
            </p>

            <p>{t('name', { val: userInfo.name })} </p>
            <p>
              {t('email')} {userInfo.email}
            </p>
          </Container>
        </Col>

        <Col md={9}>
          <h2 className='text-center'>{t('orders')}</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{t('date')}</th>
                  <th>{t('TOTAL')}</th>
                  <th>{t('paid')}</th>
                  <th>{t('deliverd')}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDeliverd ? (
                        order.deliverdAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light'>{t('details')}</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
