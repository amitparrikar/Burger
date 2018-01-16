import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Cheese', type: 'cheese'},
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' }
];

class BuildControls extends Component {

  componentDidUpdate() {
    // console.log('BuildControls.js: Update!');
  }

  render () {
    return (
      <div className={classes.BuildControls}>
        <p>Your Current Price: <strong>$ {this.props.totalPrice.toFixed(2)}</strong></p>
        {
          controls.map(ctrl => <BuildControl
                                  key={ctrl.label}
                                  label={ctrl.label}
                                  type={ctrl.type}
                                  isDisabled={this.props.disabledStatus[ctrl.type]}
                                  added={() => this.props.ingredientAdded(ctrl.type)}
                                  removed={() => this.props.ingredientRemoved(ctrl.type)} />)
        }
        <button className={classes.OrderButton} type="button" disabled={!this.props.purchasable} onClick={this.props.purchaseHandler}>
          {this.props.isAuthenticated ? 'ORDER NOW' : 'SignIn to Order'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPrice: state.bbr.totalPrice,
    isAuthenticated: state.auth.token != null
  };
};

BuildControls.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  purchasable: PropTypes.bool
};

export default connect(mapStateToProps, null)(BuildControls);
