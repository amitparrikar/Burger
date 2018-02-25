import * as actionTypes from './actionTypes';
// import AuthAxios from './../../configs/auth-axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  // Move all the Side Effects to Saga's

  // sessionStorage.removeItem('token');
  // sessionStorage.removeItem('userId');
  // sessionStorage.removeItem('expirationDate');

  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const authDidLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authSetTimeout = (expirationTime) => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(authLogout());
  //   }, expirationTime);
  // };

  return {
    type: actionTypes.AUTH_TIMEOUT,
    expirationTime
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

/**
 * Async Reducer Action, at the mercy of Thunk!!
**/
export const auth = (email, password, isSignIn) => {
  // return (dispatch) => {
  //   dispatch(authStart());
  //   const postData = {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   };
  //
  //   const API_KEY = 'AIzaSyAxm2g_PO4aKIMyV3VKpdxuWgzAGNlqR9A';
  //   let url = `signupNewUser?key=${API_KEY}`;
  //   if (isSignIn) {
  //     url = `verifyPassword?key=${API_KEY}`;
  //   }
  //
  //   AuthAxios.post(url, postData).then(response => {
  //     const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
  //
  //     sessionStorage.setItem('token', response.data.idToken);
  //     sessionStorage.setItem('userId', response.data.localId);
  //     sessionStorage.setItem('expirationDate', expirationDate);
  //
  //     dispatch(authSuccess(response.data));
  //     dispatch(authSetTimeout(response.data.expiresIn * 1000));
  //   }).catch(error => {
  //     const errorMessage = JSON.parse(error.request.response).error.message;
  //     dispatch(authFail(errorMessage));
  //   });
  // };

  return {
    type: actionTypes.AUTH_LOGIN,
    password,
    email,
    isSignIn
  };
};

export const authCheckState = () => {
  // return dispatch => {
  //   const token = sessionStorage.getItem('token');
  //   const userId = sessionStorage.getItem('userId');
  //   const expirationDate = new Date(sessionStorage.getItem('expirationDate'));
  //
  //   if(!token) {
  //     dispatch(authLogout());
  //   } else {
  //     if ( expirationDate < new Date()) {
  //       dispatch(authLogout());
  //     } else {
  //       const expirationTimeLeft = expirationDate - new Date();
  //       dispatch(authSetTimeout(expirationTimeLeft));
  //       dispatch(authSuccess({idToken: token, localId: userId}));
  //     }
  //   }
  // }

  return {
    type: actionTypes.AUTH_CHECK_INITIAL_STATE
  };
};
