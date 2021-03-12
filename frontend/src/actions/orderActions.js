import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios.post(`/api/orders`, { order, userInfo }, {})

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/orders/${id}`, {}) //pass the id into this route as well as the config and extract data

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      {}
    ) //pass the id into this route as well as the config and extract data

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    ) //pass the id into this route as well as the config and extract data

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.get(`/api/orders`, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}
