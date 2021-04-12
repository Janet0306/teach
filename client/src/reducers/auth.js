import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  USER_LIST,
  USER_LIST_FAIL,
  USER_DELETE,
  USER_DELETE_ERROR,
  USER_DETAILS,
  USER_DETAILS_ERROR,
  LOGOUT,
  ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  error: {},
  user: null,
  users: []
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case USER_LIST:
      return {
        ...state,
        users: payload,
        isAuthenticated: true,
        loading: false
      }
    case USER_LIST_FAIL:
      return {
        isAuthenticated: true,
        loading: false,
        error: payload
      }
    case USER_DETAILS: 
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        users: payload
      }
    case USER_DETAILS_ERROR:
      return {
        isAuthenticated: true,
        loading: false,
        error: payload
      }
    case USER_DELETE:
      return {
        ...state,
        users: state.users.filter((user) => user._id !==payload),
        loading: false,
      }
    case USER_DELETE_ERROR:
      return {
        isAuthenticated: true,
        loading: false,
        error: payload
      }
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}

export default authReducer;


