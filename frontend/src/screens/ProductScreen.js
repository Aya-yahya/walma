import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Row,
  Col,
  Image,
  ListGroup,
  Accordion,
  Card,
  Button,
  Form,
  Container,
} from 'react-bootstrap'

import { listProductDetails } from '../actions/productActions'
import { AddProductToWishlist } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [active, setActive] = useState(false)
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    dispatch(listProductDetails(match.params.id)) // match.params.id takes the id part of the current url and we pass it in here as an argument to get that specific product
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const addToWishlist = (e) => {
    e.preventDefault()
    if (!userInfo) {
      history.push(`/login`)
    } else {
      dispatch(AddProductToWishlist(match.params.id))
      alert('product added to your wishlist ')
    }
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Container style={{ marginBottom: '4rem' }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              <Col md={6}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  //style={{ width: 300, height: 300 }}
                />
              </Col>
              <Col md={6}>
                <ListGroup variant='flush' className='text-center'>
                  {product.countInStock > 0 ? (
                    <Container className='justify-content-center'>
                      <span
                        className='badge '
                        style={{ backgroundColor: '#ed9003' }}
                      >
                        In Stock
                      </span>
                    </Container>
                  ) : (
                    <Container className='text-center'>
                      <span
                        className='badge '
                        style={{ backgroundColor: '#ed9003' }}
                      >
                        Out Of Stock
                      </span>
                    </Container>
                  )}
                </ListGroup>
                <ListGroup variant='flush' className='text-center'>
                  <ListGroup.Item className='noborder'>
                    <h3>{product.name} </h3>
                  </ListGroup.Item>

                  <ListGroup.Item className='noborder'>
                    <Row className='align-items-center  justify-content-center'>
                      <Col md={5} className='justify-content-center'>
                        <Form.Control
                          as='select'
                          className='sm mr-sm-2 '
                          id='inlineFormCustomSelect'
                          custom
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={5} style={{ marginTop: '20px' }}>
                        <Button
                          onClick={addToCartHandler}
                          className='btn  '
                          style={{ backgroundColor: 'black' }}
                          type='button'
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className='noborder'>
                    <Row className='align-items-center  justify-content-center'>
                      <Col
                        // md={6}
                        className=' align-items-center justify-content-center'
                      >
                        <h4>Price : {product.price} KD</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h5>Description : {product.description}</h5>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default ProductScreen
