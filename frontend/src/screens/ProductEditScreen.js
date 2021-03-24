import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions.js'
import { useTranslation } from 'react-i18next'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [onSale, setOnSale] = useState(false)
  const [saleQty, setSaleQty] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [lastDate, setLastDate] = useState(new Date())
  const [arabicName, setArabicName] = useState('')
  const [englishName, setEnglishName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const { t, i18n } = useTranslation()
  const [countInStock, setCountInStock] = useState(0)
  const [descriptionAR, setDescriptionAR] = useState('')
  const [descriptionEN, setDescriptionEN] = useState('')
  const [uploading, setUploading] = useState(false) //this is just like any other loading state we use. we set true when making our request and set it back to false when request is done

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails) //grab productDetails which gets its data from productDetailsReducer...
  const { loading, error, product } = productDetails //...then deconstruct and get these from the state

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0] //you can upload multiple files which gives u access to this files array, but we only want 1 file so we get 1st index
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data) //the data we get back is the path which is why we use setImage here
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        arabicName,
        englishName,
        price,
        image,
        onSale,
        discount,
        lastDate,
        saleQty,
        descriptionAR,
        descriptionEN,
        countInStock,
      })
    )
  }

  const productUpdate = useSelector((state) => state.productUpdate) //grab productUpdate which gets its data from productUpdateReducer...
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate //...then deconstruct and get these from the state

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setArabicName(product.name['ar'])
        setEnglishName(product.name['en'])
        setPrice(product.price)
        setImage(product.image)
        setOnSale(product.sale.status)

        setDiscount(product.sale.discount)
        setSaleQty(product.sale.qty)
        if (product.sale.status) {
          setLastDate(new Date(product.sale.lastDay))
        }
        setCountInStock(product.countInStock)
        setDescriptionAR(product.description['ar'])
        setDescriptionEN(product.description['en'])
      }
    }
  }, [product, dispatch, productId, history, successUpdate])

  return (
    <Container>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1 className='text-center'>{t('editProduct')}</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Row className='margins'>
              <Col md={2}>
                <Form.Label column>
                  <strong>{t('name')}</strong>
                </Form.Label>
              </Col>
              <Col md={5}>
                <Form.Control
                  type='name'
                  placeholder={t('enterenname')}
                  value={englishName}
                  onChange={(e) => {
                    setEnglishName(e.target.value)
                  }}
                ></Form.Control>
              </Col>
              <Col md={5}>
                <Form.Control
                  type='name'
                  placeholder={t('enterarname')}
                  value={arabicName}
                  onChange={(e) => {
                    setArabicName(e.target.value)
                  }}
                ></Form.Control>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={2}>
                <Form.Label column>
                  <strong>{t('price')}</strong>
                </Form.Label>
              </Col>
              <Col md={4}>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Col>
              <Col md={2}>
                <Form.Label>
                  <strong>{t('countinstock')}</strong>
                </Form.Label>
              </Col>
              <Col md={3}>
                <Form.Control
                  type='number'
                  placeholder='Enter count in stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Row>
            <Form.Row className='margins'>
              <Col md={2}>
                <Form.Label column>
                  <strong>Image</strong>
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Col>
              <Col>
                <Form.File
                  id='image-file'
                  label='Choose file'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <h2>Uploading...</h2>}
              </Col>
            </Form.Row>
            <Form.Row className='margins'>
              <Col md={2}>
                <Form.Label>
                  <strong>{t('descrip')}</strong>
                </Form.Label>
              </Col>
              <Col md={5}>
                <Form.Control
                  type='text'
                  placeholder={t('descripEN')}
                  value={descriptionEN}
                  onChange={(e) => setDescriptionEN(e.target.value)}
                ></Form.Control>
              </Col>
              <Col md={5}>
                <Form.Control
                  type='text'
                  placeholder={t('descripAR')}
                  value={descriptionAR}
                  onChange={(e) => setDescriptionAR(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={3}>
                <Form.Check
                  type='checkbox'
                  label={t('onsale')}
                  checked={onSale}
                  onChange={(e) => {
                    setOnSale(!onSale)
                    console.log(onSale)
                  }}
                />
              </Col>
              <Col md={2}>
                <Form.Label>
                  <strong>{t('countOnSale')}</strong>
                </Form.Label>
              </Col>
              <Col md={2}>
                <Form.Control
                  type='number'
                  placeholder='Enter count in sale'
                  value={saleQty}
                  onChange={(e) => setSaleQty(e.target.value)}
                ></Form.Control>
              </Col>
              <Col md={2}>
                <Form.Label>
                  <strong>{t('discount')}</strong>
                </Form.Label>
              </Col>
              <Col md={2}>
                <Form.Control
                  type='number'
                  placeholder='Enter disscount'
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Row>
            <Form.Row className='center my-3'>
              <Col md={3}>
                <Form.Label>{t('salelastdate')}</Form.Label>
              </Col>
              <DatePicker
                selected={lastDate}
                onChange={(date) => {
                  setLastDate(date)
                }}
              />
            </Form.Row>
            <Container className='text-center'>
              <Button
                type='submit'
                style={{
                  backgroundColor: 'black',
                  color: '#ed9003',
                  marginBottom: '30px',
                  marginTop: '30px',
                }}
              >
                {t('edit')}
              </Button>
            </Container>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default ProductEditScreen
