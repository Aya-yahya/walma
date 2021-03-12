import axios from 'axios'
import {
  CODE_DETAILS_REQUEST,
  CODE_DETAILS_FAIL,
  CODE_DETAILS_SUCCESS,
  CODE_CREATE_REQUEST,
  CODE_CREATE_SUCCESS,
  CODE_CREATE_FAIL,
  CODE_LIST_REQUEST,
  CODE_LIST_SUCCESS,
  CODE_LIST_FAIL,
  CODE_DELETE_SUCCESS,
  CODE_DELETE_FAIL,
  CODE_DELETE_REQUEST,
} from '../constants/promocodeConstants'

export const listCodeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CODE_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/promocodes/${id}`)
    dispatch({ type: CODE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CODE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCode = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CODE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        // don't need content-type here
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    await axios.delete(`/api/promocodes/${id}`, config)

    dispatch({ type: CODE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CODE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const listCodes = () => async (dispatch) => {
  try {
    dispatch({ type: CODE_LIST_REQUEST })
    const { data } = await axios.get('/api/promocodes')
    dispatch({ type: CODE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CODE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCode = (code) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CODE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/promocodes`, code, config) // we send an emptu object because we're making a post request but not actually sending any data

    dispatch({ type: CODE_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CODE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}
