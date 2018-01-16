import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Aux from './../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './../../store/actions/index';
import Axios from './../../configs/orders-axios';

class BurgerBuilder extends Component {

  constructor (props) {
    super(props);
    this.state = {
      purchasing: false,
      loading: false
    };
  }

  componentWillMount () { }

  componentDidMount() {
    this.props.onInitIngredient();
  }

  componentWillReceiveProps(nextProps) { }

  /**
   * This Lifecyle hook should not be present if we are extending PureComponent
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {Boolean}          [Should always return Boolean, which tells react, whether to render component or not!]
   */
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) { }

  componentDidUpdate() { }

  updatePurchaseState() {
    let ingredientCount = Object.values(this.props.ingredients).reduce((sum, curVal) => (sum + curVal), 0);

    return ingredientCount > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState((prevState, props) => {
        return {purchasing: !prevState.purchasing};
      });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  // continuePurchaseHandler = () => {
  //   // const queryParams = [];
  //   //
  //   // for (let key in this.props.ingredients) {
  //   //   queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ingredients[key]));
  //   // }
  //   // const queryString = queryParams.join('&') + `&price=${this.props.totalPrice}`;
  //   //
  //   // this.props.history.push({
  //   //   pathname: '/checkout',
  //   //   search: '?' + queryString
  //   // });
  //   this.props.history.push('/checkout');
  // };

  render() {
    let disabledStatus = {...this.props.ingredients};
    let orderSummary = <Spinner />;

    for(let key in disabledStatus) {
      disabledStatus[key] = disabledStatus[key] === 0;
    }

    if (this.props.ingredients) {
      orderSummary = <OrderSummary ingredients={this.props.ingredients} closeModal={this.purchaseHandler}/>;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} loading={this.state.loading} closeModal={this.purchaseHandler} >
          {orderSummary}
        </Modal>
        {
          this.props.ingredients ? (
            <Aux>
              <Burger/>
              <BuildControls
                    purchaseHandler={this.purchaseHandler}
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    purchasable={this.updatePurchaseState()}
                    disabledStatus={disabledStatus}/>
            </Aux>
          ): this.props.error ? <p style={{textAlign: 'center'}}>Ingredient cannot be loaded</p> : <Spinner />
        }
      </Aux>
    );
  }

  componentWillUnmount (){ }
}

const mapStateToProps = (state) => {
  // bbr is the sub reducers that gets combined.
  // bbr gets appended from index.js file, where we combine the Reducers.
  return {
    ingredients: state.bbr.ingredients,
    totalPrice: state.bbr.totalPrice,
    error: state.bbr.error,
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (name) => dispatch(actions.addIngredient(name)),
    onRemoveIngredient: (name) => dispatch(actions.removeIngredient(name)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(BurgerBuilder), Axios));
