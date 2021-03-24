import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
  listAllProducts,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  //const pageNumber = match.params.pageNumber || 1
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.allProductsList)
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
    dispatch(listAllProducts())
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Delete this product? THIS ACTION IS IRREVERSIBLE.')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1 className='text-center'>{t('products')}</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/admin/product/create`}>
            <Button className='my-3' variant='secondary'>
              <i className='fas fa-plus'></i> {t('createProduct')}
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
                <th>{t('name')}</th>
                <th>{t('Price')}</th>

                <th>{t('countinstock')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name[i18n.language]}</td>
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
    </Container>
  )
}

export default ProductListScreen

//<Paginate pages={pages} page={page} isAdmin={true} />
