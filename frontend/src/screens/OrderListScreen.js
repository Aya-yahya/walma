import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin // MIGHT BE A PROBLEM WITH THE WAY WE HAVE THE USER REDUCER LABELED

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1
            className='text-center'
            style={{ marginTop: '2rem', marginBottom: '1rem' }}
          >
            Orders
          </h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>

              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid At</th>
              <th>Delivered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                {/* createdAt comes directly from mongodb */}
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? order.paidAt.substring(0, 10) : 'Not paid'}
                </td>
                <td>
                  {order.isDeliverd
                    ? order.deliverdAt.substring(0, 10)
                    : 'Not delivered'}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default OrderListScreen
