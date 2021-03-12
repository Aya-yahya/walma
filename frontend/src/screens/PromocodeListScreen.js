import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { deleteCode, listCodes, createCode } from '../actions/promoCodesActions'
import { CODE_UPDATE_RESET } from '../constants/promocodeConstants'

const PromocpdeListScreen = () => {
  const [show, setShow] = useState(false)
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }

  const codesList = useSelector((state) => state.codesList)
  const { loading, error, codes } = codesList

  const codeDelete = useSelector((state) => state.codeDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = codeDelete

  const codeCreate = useSelector((state) => state.codeCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    code: myCode,
  } = codeCreate

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listCodes())

    if (successCreate) {
      setShow(false)
    }
  }, [dispatch, successDelete, successCreate])

  const deleteHandler = (id) => {
    if (window.confirm('Delete this Brand? THIS ACTION IS IRREVERSIBLE.')) {
      dispatch(deleteCode(id))
    }
  }

  const createHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCode({
        code,
        discount,
      })
    )
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1 className='text-center'>Promocodes</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' variant='secondary' onClick={handleShow}>
            <i className='fas fa-plus'></i> Create Promocode
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Promocode</Modal.Title>
            </Modal.Header>
            <Form onSubmit={createHandler}>
              <Modal.Body>
                <Form.Group controlId='code'>
                  <Row>
                    <Col md={3}>
                      <Form.Label>Code</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type='name'
                        placeholder='Enter promocode'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId='discount'>
                  <Row>
                    <Col md={3}>
                      <Form.Label>Discount</Form.Label>
                    </Col>
                    <Col md={8}>
                      <Form.Control
                        type='number'
                        placeholder='Enter Discount amount if 15% enter 0.15'
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button type='submit' variant='secondary'>
                  Create
                </Button>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
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
                <th>PromoCode</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((promocode) => (
                <tr key={promocode._id}>
                  <td>{promocode._id}</td>
                  <td>{promocode.code}</td>
                  <td>{promocode.discount}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(promocode._id)}
                    >
                      <i className='fas fa-trash'></i>
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
export default PromocpdeListScreen
