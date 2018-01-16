import React, { Component } from 'react';

import Modal from './../../components/UI/Modal/Modal';
import Aux from  './../Aux/Aux';

const withErrorHandler = (WrappingContainer, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    reqInterceptor = null;
    resInterceptor = null;

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});

        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(null, error => {
        console.log(error);
        this.setState({error: error.message});

        return Promise.reject(error);
      });
    }

    // Eject the Interceptor listener once component is unmount.
    // This will be usefull during Routing.
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closeModalHandler = () => {
      this.setState({error: null});
    };

    render () {
      return (
        <Aux>
          <Modal show={this.state.error} closeModal={this.closeModalHandler}>Error occured: { this.state.error }</Modal>
          <WrappingContainer {...this.props} />
        </Aux>
      );
    }
  }
};

export default withErrorHandler;
