import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
const Product = ({ product }) => {
  const { t, i18n } = useTranslation()

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
          //  width='100px'
          //  height='200px'
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='h6' className='text-center'>
            <strong>{product.name[i18n.language]}</strong>
          </Card.Title>
        </Link>
        <Container className=' align-items-center justify-content-center'>
          {product.sale.status ? (
            <Card.Text
              as='h6'
              style={{ color: 'black' }}
              className='text-center'
            >
              <del style={{ color: '#ed9003' }}>{product.price} KD</del>
              <br />
              <text>
                {product.price - product.price * product.sale.discount} KD
              </text>
            </Card.Text>
          ) : (
            <Card.Text
              as='h6'
              style={{ color: 'black' }}
              className='text-center'
            >
              {product.price} KD
            </Card.Text>
          )}
        </Container>
      </Card.Body>
    </Card>
  )
}

export default Product
