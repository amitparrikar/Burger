import React from 'react';

import classes from './SideDrawer.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Aux from './../../../hoc/Aux/Aux';
import BackDrop from './../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  const sideDrawerClass = [classes.SideDrawer, (props.isOpen ? classes.Open: classes.Close)].join(' ');

  return (
    <Aux>
      <BackDrop show={props.isOpen} closeBackdrop={props.toggleSideDrawer} />
      <div className={sideDrawerClass} onClick={props.toggleSideDrawer}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
