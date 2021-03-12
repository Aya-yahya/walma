import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Button, Row, Col, Badge, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1 className='H1 text-center'>
        <Badge style={{ backgroundColor: '#ed9003', color: 'black' }}>
          Login
        </Badge>
      </h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} controlId='email' className='margins'>
          <Form.Label className='text-muted' column sm='3'>
            <strong> Email </strong>
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

        <Form.Group as={Row} controlId='password'>
          <Form.Label className='text-muted' column sm='3'>
            <strong>Password</strong>
          </Form.Label>
          <Col sm='8'>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </Button>
        </Container>
      </Form>

      <Row className='py-3'>
        <Col className='text-center'>
          New customer?{'  '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <span
              className='badge badge-pill '
              style={{ backgroundColor: 'black', color: '#ed9003' }}
            >
              Register
            </span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
