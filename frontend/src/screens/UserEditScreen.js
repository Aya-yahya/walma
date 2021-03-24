import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { useTranslation } from 'react-i18next'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const { t, i18n } = useTranslation()
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails) //grab userDetails which gets its data from userDetailsReducer...
  const { loading, error, user } = userDetails //...then deconstruct and get these from the state

  const userUpdate = useSelector((state) => state.userUpdate) //grab userUpdate which gets its data from userUpdateReducer...
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate //...then deconstruct and get these from the state

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, userId, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <Container>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h3 className='text-center' style={{ marginBottom: '2rem' }}>
          {t('editUser')}
        </h3>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Row controlId='name' className='center'>
              <Col md={2}>
                <Form.Label>{t('name')}</Form.Label>
              </Col>
              <Col md={7}>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Row>
            <Form.Row controlId='email' className='center margins'>
              <Col md={2}>
                <Form.Label>{t('email')}</Form.Label>
              </Col>
              <Col md={7}>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Row>
            <Form.Row
              controlId='isadmin'
              className='center'
              style={{ marginTop: '2rem', marginBottom: '1.5rem' }}
            >
              <Form.Check
                type='checkbox'
                label={t('isadmin')}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Row>
            <Form.Row className='center'>
              <Button type='submit' variant='primary'>
                {t('edit')}
              </Button>
            </Form.Row>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default UserEditScreen
