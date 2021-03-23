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
  DropdownButton,
  Form,
  Dropdown,
  Row,
  NavLink,
  Button,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Header2 = ({ history }) => {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState('ar')
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems, lang } = cart
  document.documentElement.dir = 'ltr'
  const numItems = cartItems.length

  const logoutHandler = () => {
    dispatch(logout())
    window.location.replace('/')
  }

  const handleOnclick = (e) => {
    e.preventDefault()
    if (language === 'ar') {
      setLanguage('en')
    } else {
      setLanguage('ar')
    }
    i18n.changeLanguage(e.target.value)
  }

  return (
    <header>
      <Row className='justify-content-center align-items-center'>
        <Col md={12} sm={12} xs={{ span: 12 }}>
          <Navbar
            expand='lg'
            style={{ backgroundColor: 'black', marginLeft: '0px' }}
          >
            <Col md={2} sm={3} xs={2}>
              <Navbar.Brand
                href='/'
                style={{
                  marginLeft: '0.5rem',

                  marginBottom: '0px',
                  marginRight: '0px',
                  marginTop: '0px',
                  padding: '0px',
                }}
              >
                <img
                  className='imge'
                  src={logo}
                  //className='imge'
                />
              </Navbar.Brand>
            </Col>
            <Col
              md={{ span: 4 }}
              sm={{ span: 4 }}
              xs={{ span: 4 }}
              //   style={{ backgroundColor: 'red' }}
              // className='mr-auto'
            >
              <Route
                render={({ history }) => (
                  <SearchBox history={history} style={{ position: 'static' }} />
                )}
              />
            </Col>
            <Col
              md={{ span: 6 }}
              sm={{ span: 3 }}
              xs={{ span: 3 }}
              // style={{ backgroundColor: 'red' }}
            >
              <Nav
                className='flex-row justify-content-end'
                //   dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              >
                <Nav.Item>
                  <Nav.Link href='/cart'>
                    <i
                      className='material-icons-outlined '
                      //  style={{ fontSize: '30px' }}
                    >
                      shopping_cart
                    </i>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    value={language}
                    onClick={handleOnclick}
                    style={{
                      color: '#ed9003',
                      backgroundColor: 'black',
                      borderColor: 'black',
                      marginTop: '5px',
                    }}
                  >
                    {i18n.language === 'ar' ? 'EN' : 'AR'}
                  </Button>
                </Nav.Item>
                <Nav.Item
                  className={'d-block d-md-none d-lg-none '}
                  style={{ margin: '10px' }}
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
                            </span>
                          }
                          id='username'
                          className='caret'
                        >
                          <LinkContainer to='/profile'>
                            <NavDropdown.Item>{t('profile')}</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>
                            {t('logout')}
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
                              {t('login')}
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
                              {t('admin')}
                            </span>
                          }
                          id='adminmenu'
                          active={false}
                          className='caret'
                        >
                          <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>
                              {t('usersList')}
                            </NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>
                              {t('productsList')}
                            </NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>
                              {t('ordersList')}
                            </NavDropdown.Item>
                          </LinkContainer>
                          {/*}
                          <LinkContainer to='/admin/promocodes'>
                            <NavDropdown.Item>PromoCodes</NavDropdown.Item>
                        </LinkContainer>*/}
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
