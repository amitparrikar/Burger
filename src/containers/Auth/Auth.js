import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import AuthAxios from './../../configs/auth-axios';

// import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import Aux from './../../hoc/Aux/Aux';
import * as actions from './../../store/actions';

class Auth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: {
          value: '',
          type: 'string',
          valid: true,
          rules: {
            type: 'email',
            required: true,
            minLength: 5
          }
        },
        password: {
          value: '',
          type: 'string',
          valid: true,
          rules: {
            type: 'password',
            required: true,
            minLength: 5
          }
        }
      },
      valid: true,
      signInMode: true
    };
  }

  checkIfValid = (value, name) => {
    let formElement = {...this.state.form[name]};
    let rules = formElement.rules;
    let valid = true;
    if (rules.type === 'email' || rules.type === 'password') {
      if (rules.required) {
        valid = value.length > 0;
      }
      if (rules.minLength) {
        valid = value.length >= rules.minLength && valid;
      }

      formElement.value = value;
      formElement.valid = valid;
    }

    return formElement;
  };

  formChangeHandler = (event, elementName) => {
    let targetText = event.target.value;
    let formElement = this.checkIfValid(targetText, elementName);
    let stateClone = {...this.state};
    stateClone.form[elementName] = formElement;

    this.setState(stateClone);
  };

  authHandler = (e) => {
    e.preventDefault();

    this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.signInMode);
  };

  switchMode = (e) => {
    e.preventDefault();

    this.setState((nextState, nextProps) => {
      return {
        signInMode: !nextState.signInMode
      };
    });
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/');
    }
  }

  render() {

    let form = <Spinner />;
    let authenticated = null;
    if (!this.props.loading) {
      form = (
        <form>
          <Input type="email" name="email" label="Email Address" value={this.state.form.email.value} onChange={(e) => this.formChangeHandler(e, 'email')}/>
          <Input type="password" name="password" label="Password" value={this.state.form.password.value} onChange={(e) => this.formChangeHandler(e, 'password')}/>

          {
            this.state.signInMode ?
              (
                <Aux>
                  <Button btnType="Success" clickHandler={this.authHandler}>Log In</Button>
                  <Button btnType="Danger LinkButton btn-sm" clickHandler={this.switchMode}>Sign Up</Button>
                </Aux>
              ):
              (
                <Aux>
                  <Button btnType="Success" clickHandler={this.authHandler}>Submit</Button>
                  <Button btnType="Danger LinkButton btn-sm" clickHandler={this.switchMode}>Sign In</Button>
                </Aux>
              )
          }
        </form>
      );
    }

    if (this.props.isAuthenticated) {
      authenticated = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        { authenticated }
        { this.state.signInMode ? (<span className={classes.Title}>Sign In</span>): (<span className={classes.Title}>Sign Up</span>) }
        { form }
        <span className={classes.AuthError}>{this.props.error}</span>
      </div>
    );
  }

  // componentWillReceiveProps() {}
  // componentWillMount() {}
  // componentDidMount() {}
  // shouldComponentUpdate() {}
  // componentWillUpdate() {}
  // componentDidUpdate() {}
  // componentDidCatch() {}
  // componentWillUnmount() {}
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.bbr.building
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pwd, mode) => dispatch(actions.auth(email, pwd, mode)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

// export default connect(null, mapDispatchToProps)(withErrorHandler(Auth, AuthAxios));
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
