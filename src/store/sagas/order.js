import { put } from 'redux-saga/effects';

import * as actions from './../actions';
import Axios from './../../configs/orders-axios';

export function* purchaseBurgerSaga(action) {
  try {
    const response = yield Axios.post(`orders.json?auth=${action.token}`, action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
};

export function* fetchOrdersSaga(action) {
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

  try {
    const response = yield Axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = [];

    for(let key in response.data) {
      fetchedOrders.push({
        id: key,
        ...response.data[key]
      });
    }

    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
};
