import React, { useEffect, useState } from 'react'
import logo from '../walmalogo.png'
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
const Header = ({ history }) => {
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
      <Row>
        <Col md={12} sm={12} xs={{ span: 12 }}>
          <Navbar expand='lg' style={{ backgroundColor: 'black' }}>
            <Col md={2} sm={4} xs={4}>
              <Navbar.Brand
                href='/'
                style={{
                  marginLeft: '2rem',
                  marginBottom: '0px',
                  marginTop: '0px',
                  padding: '0px',
                }}
              >
                <img src={logo} />
              </Navbar.Brand>
            </Col>
            <Col
              md={{ span: 4, order: 1 }}
              sm={{ span: 12, order: 2 }}
              xs={{ span: 12, order: 2 }}
              className='mr-auto'
            >
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Col>
            <Col
              md={{ span: 6, order: 2 }}
              sm={{ span: 6, order: 1 }}
              xs={{ span: 6, order: 1 }}
            >
              <Nav className='flex-row justify-content-end'>
                <Nav.Item>
                  <Nav.Link href='/cart'>
                    <i className='fas fa-shopping-cart fa-lg'>
                      <sup>{numItems}</sup>
                    </i>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className='d-block d-md-none d-lg-none'>
                  <Dropdown>
                    <Dropdown.Toggle as={NavLink} className='noCaret '>
                      <i
                        class='fas fa-bars fa-lg'
                        style={{ color: '#ed9003', marginLeft: '1rem' }}
                      ></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {userInfo ? (
                        <LinkContainer to={'/profile'}>
                          <Dropdown.Item key={'profile'}>Profile</Dropdown.Item>
                        </LinkContainer>
                      ) : (
                        <LinkContainer to={'/login'}>
                          <Dropdown.Item key={'login'}>Login</Dropdown.Item>
                        </LinkContainer>
                      )}
                      <LinkContainer to={'/aboutus'}>
                        <Dropdown.Item key={'aboutus'}>About us</Dropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/search'}>
                        <Dropdown.Item key={'products'}>Products</Dropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/offers'}>
                        <Dropdown.Item key={'offers'}>offers</Dropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/callus'}>
                        <Dropdown.Item key={'callus'}>Contact</Dropdown.Item>
                      </LinkContainer>
                    </Dropdown.Menu>
                  </Dropdown>
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

export default Header
