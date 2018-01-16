import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from './../../../configs/orders-axios';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from './../../../store/actions';

class ContactData extends Component {
  state = {
    form: {
      name: {
        value: '',
        type: 'string',
        valid: true,
        rules: {
          type: 'text',
          required: true,
          minLength: 5,
          maxLength: 20
        }
      },
      email: {
        value: '',
        type: 'string',
        valid: true,
        rules: {
          type: 'email',
          required: false
        }
      },
      street: {
        value: '',
        type: 'string',
        valid: true,
        rules: {
          type: 'text',
          required: true
        }
      },
      zipCode: {
        value: '',
        type: 'number',
        valid: true,
        rules: {
          type: 'number',
          required: false
        }
      }
    },
    valid: true
  };

  checkIfValid = (value, name) => {
    let formElement = {...this.state.form[name]};
    let rules = formElement.rules;
    let valid = true;
    if (rules.type === 'text') {
      if (rules.required) {
        valid = value.length > 0;
      }
      if (rules.minLength) {
        valid = value.length >= rules.minLength && valid;
      }
      if(rules.maxLength) {
        valid = value.length <= rules.maxLength && valid;
      }

      formElement.value = value;
      formElement.valid = valid;
    } else {
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

  orderHandler = (event) => {
    event.preventDefault();

    const postData = {
      userId: this.props.userId,
      ingredient: this.props.ingredients,
      price: this.props.totalPrice,
      deliveryMethod: 'Fastest',
      customer: {
        name: this.state.form.name.value,
        email: this.state.form.email.value,
        address: {
          street: this.state.form.street.value,
          zipCode: this.state.form.zipCode.value
        }
      }
    };

    this.props.onOrderBurgerStart();
    this.props.onOrderBurger(postData, this.props.token);
    //this.setState({loading: true});

    // Axios.post('orders.json', postData).then(response => {
    //   this.setState({loading: false});
    //   this.props.history.push('/');
    // }).catch(error => {
    //   this.setState({loading: false});
    // });
  };

  render () {
    return (
      this.props.loading ? <Spinner /> : (
        <div className={classes.ContactData}>
          <h4>Enter your details: </h4>
          <form>
            <Input type="text" name="name" label="Your full name" value={this.state.form.name.value} onChange={(e) => this.formChangeHandler(e, 'name')}/>
            <Input type="email" name="email" label="Your Email" value={this.state.form.email.value} onChange={(e) => this.formChangeHandler(e, 'email')}/>
            <Input type="text" name="street" label="Street Name" value={this.state.form.street.value} onChange={(e) => this.formChangeHandler(e, 'street')}/>
            <Input type="number" name="zipCode" label="Postal Code" value={this.state.form.zipCode.value} onChange={(e) => this.formChangeHandler(e, 'zipCode')}/>

            <Button btnType="Success" clickHandler={this.orderHandler}>Order</Button>
          </form>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.bbr.ingredients,
    totalPrice: state.bbr.totalPrice,
    loading: state.or.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurgerStart: () => dispatch(orderAction.purchaseBurgerStart()),
    onOrderBurger: (orderData, token) => dispatch(orderAction.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));
