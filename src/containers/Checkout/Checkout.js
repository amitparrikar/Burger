import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Aux from './../../hoc/Aux/Aux';

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  // componentDidMount() {
  //   const queryParam = new URLSearchParams(this.props.location.search);
  //   let ingredients = {};
  //   let totalPrice = 0;
  //   for(let param of queryParam.entries()) {
  //     if (param[0] !== 'price') {
  //       ingredients[param[0]] = +param[1];
  //     } else {
  //       totalPrice = +param[1];
  //     }
  //
  //   }
  //
  //   this.setState({ingredients: ingredients, totalPrice: totalPrice});
  // }

  render() {
    let checkoutSummary = <Redirect to="/" />
    if (this.props.ingredients) {
      if (this.props.purchased) {
        return <Redirect to="/" />
      }
      checkoutSummary = <Aux>
        <CheckoutSummary ingredients={this.props.ingredients} checkoutCancel={this.checkoutCancelHandler} checkoutContinue={this.checkoutContinueHandler.bind(this)}/>
        {/*
          <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
          <Route path={this.props.match.url + '/contact-data'} render={(props) => <ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients} {...props} />} />
        */}
        <Route path={this.props.match.url + '/contact-data'} exact component={ContactData} />
      </Aux>
    }

    return checkoutSummary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.bbr.ingredients,
    totalPrice: state.bbr.totalPrice,
    purchased: state.or.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
