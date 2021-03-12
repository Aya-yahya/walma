import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { listProducts } from '../actions/productActions'
//import Paginate from '../components/Paginate'
import Loader from '../components/Loader'
import head from '../coffee.jpg'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image, Row, Col, Container } from 'react-bootstrap'

const ProductCarousal = ({ match }) => {
  const [select, setSelect] = useState('')
  const pageNumber = 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts('', pageNumber))
  }, [dispatch, pageNumber])

  return (
    <Carousel
      pause='hover'
      variant='dark'
      nextIcon={<i className='fas fa-chevron-right fa-3x'></i>}
      prevIcon={<i className='fas fa-chevron-left fa-3x'></i>}
      sm={6}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousal
