import React, { useEffect } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const ProductsList = ({ match }) => {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const keyword = match.params.keyword
  const id = match.params.id

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default ProductsList
