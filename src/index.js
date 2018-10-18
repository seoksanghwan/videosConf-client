import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducers'
import App from './containers/App.jsx';
//import App from './components/App';
import './style.css';
import './service/firebase';

const store = createStore(
  reducer,
  applyMiddleware(logger)
);


ReactDOM.render(
  <Provider store={store}>	
    <App />
  </Provider>,
  document.getElementById('root')
);
