import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Col } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Card
      className='my-3 py-3 rounded mr-auto align-items-center justify-content-center'
      style={{ backgroundColor: 'black' }}
      // style={{ width: '14rem', height: '24rem', backgroundColor: 'black' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='h5' className='text-center'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Container className=' align-items-center justify-content-center'>
          <Card.Text as='h4' className='text-center'>
            {product.price} KD
          </Card.Text>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default Product
