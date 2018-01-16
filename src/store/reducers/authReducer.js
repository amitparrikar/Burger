import * as actionTypes from  './../actions/actionTypes';
import { updateObject } from './../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
};

export default authReducer;

const authStart = (state, action) => {
  return updateObject(state, {loading: true, error: null});
};

const authFail = (state, action) => {
  return updateObject(state, {loading: false, error: action.error});
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: null,
    loading: false
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {authRedirectPath: action.path});
};