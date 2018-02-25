import { put } from 'redux-saga/effects';

import Axios from './../../configs/orders-axios';
import * as actions from './../actions';

export function* initIngredientSaga(action) {
  try {
    const response = yield Axios.get(`ingredients.json`);
    yield put(actions.setIngredients(response.data));
  } catch (e) {
    yield put(actions.fetchIngredientsFailed());
  }
};
