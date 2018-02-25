import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from './../actions/actionTypes';
import { logoutSaga, authSetTimeoutSaga, authSaga, authCheckStateSaga } from './auth';
import { initIngredientSaga } from './../sagas/burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './../sagas/order';
/**
 * ES6 Generator which groups our individual Saga's
 * @return {Generator} [description]
 */
export function* watchAuth() {
  // Order of takeEvery does not matter
  // all can be also used to group the watchers
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_TIMEOUT, authSetTimeoutSaga),
    takeEvery(actionTypes.AUTH_LOGIN, authSaga),
    takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
  ]);
};

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientSaga);
};

export function* watchPurchaseBurger() {
  // takeLatest watchers takes the latest action and rejects the previous actions
  yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
};
