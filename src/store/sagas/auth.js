import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import AuthAxios from './../../configs/auth-axios';
import * as actions from './../actions';

export function* logoutSaga(action) {
  // yield keyword waits for any asynchronous action to happen, does not matter if you add it to all the code lines

  // Call makes it easy to mock while testing the Saga's
  yield call([sessionStorage, 'removeItem'], 'token')
  yield call([sessionStorage, 'removeItem'], 'userId')
  yield call([sessionStorage, 'removeItem'], 'expirationDate')

  // yield sessionStorage.removeItem('token');
  // yield sessionStorage.removeItem('userId');
  // yield sessionStorage.removeItem('expirationDate');

  // put method dispatches the action
  yield put(actions.authDidLogout());
};

export function* authSetTimeoutSaga(action) {
  yield delay(action.expirationTime);
  yield put(actions.authLogout());
};

export function* authSaga(action) {
  const postData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  const API_KEY = 'AIzaSyAxm2g_PO4aKIMyV3VKpdxuWgzAGNlqR9A';
  let url = `signupNewUser?key=${API_KEY}`;
  if (action.isSignIn) {
    url = `verifyPassword?key=${API_KEY}`;
  }

  yield put(actions.authStart());

  try {
    const response = yield AuthAxios.post(url, postData);
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

    yield sessionStorage.setItem('token', response.data.idToken);
    yield sessionStorage.setItem('userId', response.data.localId);
    yield sessionStorage.setItem('expirationDate', expirationDate);

    yield put(actions.authSuccess(response.data));
    yield put(actions.authSetTimeout(response.data.expiresIn * 1000));
  } catch (error) {
    const errorMessage = JSON.parse(error.request.response).error.message;
    yield put(actions.authFail(errorMessage));
  }
}

export function* authCheckStateSaga(action) {

  const token = yield sessionStorage.getItem('token');
  const userId = yield sessionStorage.getItem('userId');
  const expirationDate = yield new Date(sessionStorage.getItem('expirationDate'));

  if(!token) {
    yield put(actions.authLogout());
  } else {
    if ( expirationDate < new Date()) {
      yield put(actions.authLogout());
    } else {
      const expirationTimeLeft = expirationDate - new Date();
      yield put(actions.authSetTimeout(expirationTimeLeft));
      yield put(actions.authSuccess({idToken: token, localId: userId}));
    }
  }
}
