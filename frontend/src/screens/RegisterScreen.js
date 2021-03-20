import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import { useTranslation } from 'react-i18next'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <Container>
      <FormContainer>
        <h1 className='H1 text-center'>
          <Badge style={{ backgroundColor: '#ed9003', color: 'black' }}>
            {t('register')}
          </Badge>
        </h1>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' as={Row} className='margins'>
            <Form.Label className='text-muted' column sm='3'>
              <strong> {t('name')} </strong>
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                calssName='form-control'
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='email' as={Row} className='margins'>
            <Form.Label className='text-muted' column sm='3'>
              <strong>{t('email')} </strong>
            </Form.Label>

            <Col sm='8'>
              <Form.Control
                calssName='form-control'
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='password' as={Row} className='margins'>
            <Form.Label className='text-muted' column sm='3'>
              <strong> {t('password')} </strong>
            </Form.Label>

            <Col sm='8'>
              <Form.Control
                calssName='form-control'
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='confirmPassword' as={Row} className='margins'>
            <Form.Label className='text-muted' column sm='3'>
              <strong> {t('confirm')} </strong>
            </Form.Label>

            <Col sm='8'>
              <Form.Control
                calssName='form-control'
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Container className='text-center'>
            <Button
              type='submit'
              style={{
                backgroundColor: 'black',
                color: '#ed9003',
                marginBottom: '30px',
                marginTop: '30px',
              }}
            >
              {t('register')}
            </Button>
          </Container>
        </Form>

        <Row className='py-3 text-center'>
          <Col>
            {t('haveAccount')}
            {'  '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              <span
                className='badge badge-pill '
                style={{ backgroundColor: 'black', color: '#ed9003' }}
              >
                {t('login')}
              </span>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  )
}

export default RegisterScreen
