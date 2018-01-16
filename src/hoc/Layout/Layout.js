import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from './../Aux/Aux';
import classes from './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSideDrawerOpen: false
    }
  }
  toggleSideDrawerHandler = () => {
    this.setState((prevState, props) => {
      return {isSideDrawerOpen: !prevState.isSideDrawerOpen};
    });
  };

  render () {
    return (
      <Aux>
        <div>
          <Toolbar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.toggleSideDrawerHandler} />
          <SideDrawer isAuth={this.props.isAuthenticated} isOpen={this.state.isSideDrawerOpen} toggleSideDrawer={this.toggleSideDrawerHandler} />
        </div>
        <main className={classes['main-content']}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
