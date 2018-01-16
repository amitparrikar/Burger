import React from 'react';

import classes from './Order.css';

const order = (props) => {
  let ingredients = [];

  for (let key in props.ingredient) {

    let className = `${classes[key]} ${classes.Ingredient}`;

    ingredients.push(
      <span className={className} key={key}>
        <strong>{key}:</strong> {props.ingredient[key]}
      </span>
    );
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
}

export default order;
