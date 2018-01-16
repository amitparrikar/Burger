import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './../../../hoc/Aux/Aux';
import Button from './../../UI/Button/Button';
import * as actions from './../../../store/actions';

class OrderSummary extends Component {

  continuePurchaseHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingName => {
      return (
        <li key={ingName}>
          <strong>{this.props.ingredients[ingName]}</strong> <span style={{textTransform: 'capitalize'}}>{ingName}</span>
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order!</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Ready to order ?</p>
        <p>Your total price:<strong> $ {this.props.totalPrice.toFixed(2)}</strong></p>
        <Button btnType="Danger" clickHandler={this.props.closeModal}>Cancel</Button>
        <Button btnType="Success" clickHandler={this.continuePurchaseHandler}>Place Order</Button>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.bbr.ingredients,
    totalPrice: state.bbr.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseInit: () => dispatch(actions.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderSummary));
