import * as actionTypes from './actionTypes';
// import Axios from './../../configs/orders-axios';

/**
 * Action creator for addIngredient
 */
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

/**
 * Action creator for removeIngredient
 */
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  // return (dispatch) => {
  //   Axios.get(`ingredients.json`).then(response => {
  //     dispatch(setIngredients(response.data));
  //   }).catch(error => {
  //     dispatch(fetchIngredientsFailed())
  //   });
  // };

  return {
    type: actionTypes.INIT_INGREDIENT
  };
};
