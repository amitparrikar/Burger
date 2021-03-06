import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initInterceptor from './configs/interceptors';
import defaultAxios from './configs/defaultAxios';
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import ordersReducer from './store/reducers/ordersReducer';
import authReducer from './store/reducers/authReducer';
import { logger } from './store/middleWare/loggingMiddleware';

// Import the Saga's
import { watchAuth, watchBurgerBuilder, watchPurchaseBurger } from './store/sagas';

// Combine the two reducer inside one root reducer.
// 'bbr' and 'or' are the suffixes that gets appended to the state inside component to access sub states of a reducer.
const rootReducer = combineReducers({
  bbr: burgerBuilderReducer,
  or: ordersReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(logger, sagaMiddleware)
));

// Register Saga watchers
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchPurchaseBurger);

defaultAxios();
initInterceptor();

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
