import React from 'react';

import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {

  return (
    <div className={classes.CheckoutSummary}>
      <h2>Enjoy your Burger!</h2>
      <div className={classes.BurgerSummary}>
        <Burger ingredients={props.ingredients} />

        <Button clickHandler={props.checkoutCancel} btnType="Danger">Cancel</Button>
        <Button clickHandler={props.checkoutContinue} btnType="Success">Continue</Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
