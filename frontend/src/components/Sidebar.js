import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import head from '../coffee.jpg'
import { Image } from 'react-bootstrap'
import { logout } from '../actions/userActions'

import { push as Menu } from 'react-burger-menu'
import { useTranslation } from 'react-i18next'
export default () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <Menu right>
      <Image src={head} style={{ width: '250px' }} />
      <a className='menu-item' href='/'>
        {t('home')}
      </a>
      {userInfo && userInfo.isAdmin && (
        <a className='menu-item' href='/admin/userlist'>
          {t('usersList')}
        </a>
      )}
      {userInfo && userInfo.isAdmin && (
        <a className='menu-item' href='/admin/productlist'>
          {t('productsList')}
        </a>
      )}
      {userInfo && userInfo.isAdmin && (
        <a className='menu-item' href='/admin/orderlist'>
          {t('ordersList')}
        </a>
      )}
      {userInfo && (
        <a className='menu-item' href='/profile'>
          {t('profile')}
        </a>
      )}
      {!userInfo && (
        <a className='menu-item' href='/login'>
          {t('login')}
        </a>
      )}

      {userInfo && (
        <a className='menu-item' onClick={logoutHandler} href='/'>
          {t('logout')}
        </a>
      )}
      {!userInfo && (
        <a className='menu-item' href='/register'>
          {t('register')}
        </a>
      )}
    </Menu>
  )
}
/*
      ) : (
        <a className='menu-item' href='/register'>
          {t('register')}
        </a>
      )}
    <div className='sidenav'>
      <a href='#section'>About</a>
      <a href='#section'>Services</a>
    </div>
    */
