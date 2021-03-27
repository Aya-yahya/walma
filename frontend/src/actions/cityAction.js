import {
  CITY_DETAILS_FAIL,
  CITY_DETAILS_REQUEST,
  CITY_DETAILS_SUCCESS,
} from '../constants/cityConstants'
import axios from 'axios'

export const listCityDetails = (code) => async (dispatch) => {
  try {
    console.log(code)
    dispatch({ type: CITY_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/city/${code}`)
    dispatch({ type: CITY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CITY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
