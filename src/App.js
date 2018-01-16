import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

const OrdersAsync = AsyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const CheckoutAsync = AsyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const AuthAsync = AsyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.checkAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
          <Route path="/auth" component={AuthAsync}/>
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component={CheckoutAsync} />
            <Route path="/orders" component={OrdersAsync}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth" component={AuthAsync}/>
            <Route path="/" component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

// withRouter is required in order to pass the router related props.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
