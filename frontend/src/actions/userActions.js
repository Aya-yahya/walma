import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_WISHLIST_FAIL,
  USER_WISHLIST_REQUEST,
  USER_WISHLIST_SUCCESS,
} from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        Content_Type: 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/users/${id}`,

      config
    )

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Content_Type: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user.id}`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.get(`/api/users`, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        // removed content-type here
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    await axios.delete(`/api/users/${id}`, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState() // we destructure two levels in to get userInfo, which is the logged in user's object

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    } //we want to send this as a header.

    const { data } = await axios.put(`/api/users/${user._id}`, user, config) //pass the id into this route as well as the config and extract data

    dispatch({ type: USER_UPDATE_SUCCESS })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}

export const AddProductToWishlist = (productId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_WISHLIST_REQUEST,
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
      `/api/users/product/${productId}`,
      {},
      config
    ) // we send an emptu object because we're making a post request but not actually sending any data

    dispatch({ type: USER_WISHLIST_SUCCESS, payload: data })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) //the payload here checks for our custom message. if it exists, send the custom message, if not, send generic message}
  }
}
