import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';


const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem href="/">Burger Builder</NavigationItem>
    { props.isAuthenticated ? <NavigationItem href="/orders">Orders</NavigationItem> : null }
    {
      props.isAuthenticated ?
        <NavigationItem href="/logout">Logout</NavigationItem> :
        <NavigationItem href="/auth">Login</NavigationItem>
    }

  </ul>
);

export default navigationItems;
