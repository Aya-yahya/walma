import React from 'react'

import { push as Menu } from 'react-burger-menu'

export default () => {
  return (
    <Menu right>
      <a className='menu-item' href='/'>
        Home
      </a>
      <a className='menu-item' href='/salads'>
        Salads
      </a>
      <a className='menu-item' href='/pizzas'>
        Pizzas
      </a>
      <a className='menu-item' href='/desserts'>
        Desserts
      </a>
    </Menu>
  )
}
/*
    <div className='sidenav'>
      <a href='#section'>About</a>
      <a href='#section'>Services</a>
    </div>
    */
