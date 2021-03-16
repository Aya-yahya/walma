import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { push as Menu } from 'react-burger-menu'

export default () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <Menu right>
      <a className='menu-item' href='/'>
        Home
      </a>

      {userInfo ? (
        <a className='menu-item' href='/profile'>
          profile
        </a>
      ) : (
        <a className='menu-item' href='/login'>
          login
        </a>
      )}
      {userInfo ? (
        <a className='menu-item' href='/'>
          logout
        </a>
      ) : (
        <a className='menu-item' href='/register'>
          Register
        </a>
      )}
    </Menu>
  )
}
/*
    <div className='sidenav'>
      <a href='#section'>About</a>
      <a href='#section'>Services</a>
    </div>
    */
