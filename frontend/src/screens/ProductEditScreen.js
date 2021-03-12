import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions.js'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')

  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
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
        name,
        price,
        image,

        description,
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
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)

        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [product, dispatch, productId, history, successUpdate])

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1 className='text-center'>Edit product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose file'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <h2>Uploading...</h2>}
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
                Edit
              </Button>
            </Container>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
