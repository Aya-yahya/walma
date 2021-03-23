import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import head from '../coffee.jpg'
import Message from '../components/Message'
//import Paginate from '../components/Paginate'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousal'

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Nav,
  Image,
  Container,
} from 'react-bootstrap'
import { listProducts, listAllProducts } from '../actions/productActions'
import { useTranslation } from 'react-i18next'

const HomeScreen = ({ match }) => {
  const [select, setSelect] = useState('')

  const { t, i18n } = useTranslation()
  const [state, setState] = useState('offers')
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.allProductsList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listAllProducts())
  }, [dispatch, state])
  //const products = []

  const handleProducts = (e) => {
    e.preventDefault()
    setState('products')
  }
  const handleOffers = (e) => {
    e.preventDefault()
    setState('offers')
  }

  return (
    <>
      <Row fluid style={{ margin: '0px' }}>
        <Image src={head} width='100%' height='300px' className='head' />
      </Row>
      <ButtonGroup className='mb-2 center'>
        <Button type='button' className='label-btn' onClick={handleProducts}>
          products
        </Button>

        <Button type='button' className='label-btn ' onClick={handleOffers}>
          offers
        </Button>
      </ButtonGroup>

      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {state === 'offers' ? (
              <Row>
                {products
                  .filter((product) => product.sale.status === true)
                  .map((product) => (
                    <Col key={product._id} sm={6} md={3} xs={6}>
                      <Product product={product} />
                    </Col>
                  ))}
              </Row>
            ) : (
              <Row>
                {products
                  .filter((product) => product.sale.status === false)
                  .map((product) => (
                    <Col key={product._id} sm={6} md={3} xs={6}>
                      <Product product={product} />
                    </Col>
                  ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default HomeScreen
/*
<Paginate
  pages={pages}
  page={page}
  keyword={keyword ? keyword : ''}
/>*/
