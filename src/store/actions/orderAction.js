import * as actionTypes from './actionTypes';
import Axios from './../../configs/orders-axios';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

/**
 * Async call to save the Order.
*/
export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    Axios.post(`orders.json?auth=${token}`, orderData).then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    }).catch(error => {
      dispatch(purchaseBurgerFail(error));
    });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    Axios.get(`/orders.json${queryParams}`).then(response => {
      const fetchedOrders = [];

      for(let key in response.data) {
        fetchedOrders.push({
          id: key,
          ...response.data[key]
        });
      }

      dispatch(fetchOrdersSuccess(fetchedOrders));
    }).catch(error => {
      dispatch(fetchOrdersFail(error));
    });
  };
};
