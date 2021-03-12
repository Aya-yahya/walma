import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  //const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin // MIGHT BE A PROBLEM WITH THE WAY WE HAVE THE USER REDUCER LABELED

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push('/login')
    }
    dispatch(listProducts(''))
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Delete this product? THIS ACTION IS IRREVERSIBLE.')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1 className='text-center'>Products</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/admin/product/create`}>
            <Button className='my-3' variant='secondary'>
              <i className='fas fa-plus'></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>

                <th>Count In Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price} KD</td>

                  <td>{product.countInStock}</td>

                  <td className='text-center'>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm '
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i
                        className='fas fa-trash'
                        style={{ color: 'black' }}
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen

//<Paginate pages={pages} page={page} isAdmin={true} />
