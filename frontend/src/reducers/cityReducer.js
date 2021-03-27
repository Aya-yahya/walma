import {
  CITY_DETAILS_FAIL,
  CITY_DETAILS_REQUEST,
  CITY_DETAILS_SUCCESS,
} from '../constants/cityConstants'

export const cityDetailsReducer = (state = { citydetails: {} }, action) => {
  switch (action.type) {
    case CITY_DETAILS_REQUEST:
      return { loading: true, ...state }
    case CITY_DETAILS_SUCCESS:
      return { loading: false, citydetails: action.payload }
    case CITY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
