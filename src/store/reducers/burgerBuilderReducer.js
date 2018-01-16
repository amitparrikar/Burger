import * as actionTypes from '../actions/actionTypes';
import {updateObject} from './../utility';

let initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_RATES = {
  salad: 0.2,
  bacon: 0.3,
  meat: 0.4,
  cheese: 0.5
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true});
    default: return state;
  }
};

export default burgerBuilderReducer;

const removeIngredient = (state, action) => {
  const updateIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] - 1});
  return updateObject(state, {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice - INGREDIENT_RATES[action.ingredientName],
    building: true
  });
};

const addIngredient = (state, action) => {
  const newIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1});
  return updateObject(state, {
    ingredients: newIngredients,
    totalPrice: state.totalPrice + INGREDIENT_RATES[action.ingredientName],
    building: true
  });
};

const setIngredients = (state, action) => {
  const newObject = {
    ingredients: {
      salad: action.ingredients.salad,
      meat: action.ingredients.meat,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon
    },
    error: false,
    totalPrice: 4,
    building: false
  };
  return updateObject(state, newObject);
};
