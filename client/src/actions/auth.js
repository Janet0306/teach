import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LIST,
  USER_LIST_FAIL,
  USER_DELETE,
  USER_DELETE_ERROR,
  USER_DETAILS,
  USER_DETAILS_ERROR,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Display all users

export const listUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/users')

    dispatch({
      type: USER_LIST,
      payload: res.data
    })
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: USER_LIST_FAIL
    });
    
  }
}

// Delete User

export const deleteUser = (id) => async (dispatch) => {
  try {

    await api.delete(`/users/${id}`)
    
    dispatch({
      type: USER_DELETE,
      payload: id
    });

    dispatch(setAlert('User Removed', 'success'))
  } catch (err) {
    dispatch({
      type: USER_DELETE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Get Users Details

export const getUserDetails = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/users/${id}`)

    dispatch({
      type: USER_DETAILS,
      payload: res.data
    })
    
  } catch (err) {
      dispatch({
      type: USER_DETAILS_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}



// Logout
export const logout = () => ({ type: LOGOUT });
