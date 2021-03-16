import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Col } from 'react-bootstrap'

const Product = ({ product }) => {
  return (
    <Card
      className='my-3 py-3 rounded mr-auto align-items-center justify-content-center'
      style={{ borderWidth: '0px' }}
      width='10px'
      // style={{ width: '14rem', height: '24rem', backgroundColor: 'black' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          width='100px'
          height='200px'
        />
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
