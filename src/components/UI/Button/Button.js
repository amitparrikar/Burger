import React from 'react';

import classes from './Button.css';

const button = (props) => {
  const classNames = [classes.Button, ...(props.btnType.split(' ').map(className => { return classes[className]}))].join(' ');
  return (
    <button className={classNames} onClick={props.clickHandler} type="button">{props.children}</button>
  );
};

export default button;
