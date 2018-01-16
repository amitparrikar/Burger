import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from  './NavigationItem.css';

class NavigationItem extends Component {
  render () {
    return (
      <li className={classes.NavigationItem}>
        <NavLink to={this.props.href} exact activeClassName={classes.active}>{this.props.children}</NavLink>
        {/*
          <a href={this.props.href} className={this.props.active ? classes.active: null}>{this.props.children}</a>
        */}
      </li>
    )
  }
}

NavigationItem.propTypes = {
  href: PropTypes.string.isRequired
};

export default NavigationItem;
