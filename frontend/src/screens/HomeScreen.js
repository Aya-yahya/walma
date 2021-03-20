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
import { listProducts } from '../actions/productActions'
import { useTranslation } from 'react-i18next'

const HomeScreen = ({ match }) => {
  const [select, setSelect] = useState('')
  const { t, i18n } = useTranslation()
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword // remember we set this to keyword in App.js in the route
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  //const products = []

  return (
    <>
      <Row fluid style={{ margin: '0px' }}>
        <Image src={head} width='100%' height='300px' className='head' />
      </Row>

      <Nav justify variant='tabs' defaultActiveKey='/home'>
        <Nav.Item>
          <Nav.Link eventKey='link-1'>{t('products')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-1'>{t('offers')}</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={6} md={3} xs={6}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
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
