import {
  CODE_DETAILS_REQUEST,
  CODE_DETAILS_FAIL,
  CODE_DETAILS_SUCCESS,
  CODE_CREATE_REQUEST,
  CODE_CREATE_SUCCESS,
  CODE_CREATE_FAIL,
  CODE_CREATE_RESET,
  CODE_DELETE_REQUEST,
  CODE_DELETE_SUCCESS,
  CODE_DELETE_FAIL,
  CODE_LIST_REQUEST,
  CODE_LIST_SUCCESS,
  CODE_LIST_FAIL,
} from '../constants/promocodeConstants'

export const promocodeDetailsReducer = (state = { code: {} }, action) => {
  switch (action.type) {
    case CODE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case CODE_DETAILS_SUCCESS:
      return { loading: false, code: action.payload }
    case CODE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const codeCreateReducer = (state = { code: {} }, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case CODE_CREATE_REQUEST:
      return { loading: true }
    case CODE_CREATE_SUCCESS:
      return { loading: false, success: true, code: action.payload }
    case CODE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CODE_CREATE_RESET:
      return { code: {} }
    default:
      //always have a default
      return state
  }
}

export const codeDeleteReducer = (state = {}, action) => {
  switch (
    action.type // this is where the reducer does things according to each type.
  ) {
    case CODE_DELETE_REQUEST:
      return { loading: true }
    case CODE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CODE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      //always have a default
      return state
  }
}

export const codesListReducer = (state = { codes: [] }, action) => {
  switch (action.type) {
    case CODE_LIST_REQUEST:
      return { loading: true, codes: [] }
    case CODE_LIST_SUCCESS:
      return {
        loading: false,
        codes: action.payload,
      }
    case CODE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
