import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Orders.css';
import Order from './../../components/Order/Order';
import Axios from './../../configs/orders-axios';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions';

class Orders extends Component {

  componentDidMount() {
    // Axios.get('/orders.json').then(response => {
    //   const fetchedOrders = [];
    //   for(let key in response.data) {
    //     fetchedOrders.push({
    //       id: key,
    //       ...response.data[key]
    //     });
    //   }
    //
    //   this.setState({orders: fetchedOrders});
    // }).catch(error => {});

    this.props.onFetchOrdersState();
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading && this.props.orders.length > 0) {
      orders = this.props.orders.map((order, indx) => {
        return <Order key={indx} {...order} />
      })
    }
    if (this.props.orders.length === 0) [
      orders = (<h4 className={classes.EmptyOrderMessage}>You do not have any orders yet !</h4>)
    ]

    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.or.orders,
    loading: state.or.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrdersState: () => dispatch(actions.fetchOrdersStart()),
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));
