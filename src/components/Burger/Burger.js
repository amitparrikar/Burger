import React from 'react';
import { connect } from 'react-redux';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let composedIngredient = Object.keys(props.ingredients)
  .map((ingName, i) => {
    if (ingName !== 'price') {
      return [...Array(props.ingredients[ingName])].map((_, i) => <BurgerIngredient key={ingName + i} type={ingName}/> );
    }
    return null;
  })
  .reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (composedIngredient.length === 0) {
    composedIngredient = 'Please start adding ingredients!';
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {composedIngredient}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.bbr.ingredients
  };
};

export default connect(mapStateToProps, null)(burger);
