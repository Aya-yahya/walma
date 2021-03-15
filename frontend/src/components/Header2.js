import React, { useEffect, useState } from 'react'
import logo from '../walmalogo.png'
import Sidebar from './Sidebar'
import SearchBox from './SearchBox'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  Navbar,
  Col,
  Nav,
  NavDropdown,
  Dropdown,
  Row,
  NavLink,
} from 'react-bootstrap'
const Header2 = ({ history }) => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const numItems = cartItems.length

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Row className='justify-content-center align-items-center'>
        <Col md={12} sm={12} xs={{ span: 12 }}>
          <Navbar expand='lg' style={{ backgroundColor: 'black' }}>
            <Col md={2} sm={3} xs={2} style={{ margin: '0px' }}>
              <Navbar.Brand
                href='/'
                style={{
                  marginLeft: '1rem',
                  marginBottom: '0px',
                  marginRight: '0px',
                  marginTop: '0px',
                  padding: '0px',
                }}
              >
                <img src={logo} style={{ width: '80px', height: '70px' }} />
              </Navbar.Brand>
            </Col>
            <Col
              md={{ span: 4 }}
              sm={{ span: 6 }}
              xs={{ span: 6 }}
              className='mr-auto'
            >
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Col>
            <Col
              md={{ span: 6 }}
              sm={{ span: 3 }}
              xs={{ span: 3 }}
              // style={{ backgroundColor: 'red' }}
            >
              <Nav className='flex-row justify-content-end'>
                <Nav.Item>
                  <Nav.Link href='/cart'>
                    <i
                      className='material-icons-outlined'
                      style={{ fontSize: '30px' }}
                    >
                      shopping_cart
                    </i>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className='d-block d-md-none d-lg-none '
                  style={{ marginLeft: '1.5rem' }}
                >
                  <Sidebar />
                </Nav.Item>
                <Nav.Item className='d-none d-lg-block d-md-block'>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                    {userInfo ? (
                      <Nav.Item>
                        <NavDropdown
                          title={
                            <span style={{ color: '#ed9003' }}>
                              <i
                                className='fa fa-user fa-fw fa-lg'
                                style={{ marginLeft: '1rem' }}
                              ></i>
                              {userInfo.name}
                            </span>
                          }
                          id='username'
                          className='caret'
                        >
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Nav.Item>
                    ) : (
                      <Nav.Item>
                        <LinkContainer to='/login'>
                          <Nav.Link className='text-secondary'>
                            <span style={{ color: '#ed9003' }}>
                              <i
                                className='fas fa-user  fa-lg'
                                style={{ marginLeft: '1rem' }}
                              ></i>{' '}
                              login
                            </span>
                          </Nav.Link>
                        </LinkContainer>
                      </Nav.Item>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <Nav.Item>
                        <NavDropdown
                          title={
                            <span style={{ color: '#ed9003' }}>
                              <i
                                className='fas fa-user-cog '
                                style={{ marginLeft: '1rem' }}
                              ></i>{' '}
                              Admin
                            </span>
                          }
                          id='adminmenu'
                          active={false}
                          className='caret'
                        >
                          <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to='/admin/promocodes'>
                            <NavDropdown.Item>PromoCodes</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                      </Nav.Item>
                    )}
                  </Navbar.Collapse>
                </Nav.Item>
              </Nav>
            </Col>
          </Navbar>
        </Col>
      </Row>
    </header>
  )
}

export default Header2
