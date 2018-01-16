import React from 'react';

import classes from './BuildControl.css';


const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label || 'YOUR_LABEL_NAME'}</div>
      <button className={classes.Less} type="button" onClick={() => props.removed(props.type)} disabled={props.isDisabled}>Less</button>
      <button className={classes.More} type="button" onClick={() => props.added(props.type)} >More</button>
    </div>
  );
};

export default buildControl;
