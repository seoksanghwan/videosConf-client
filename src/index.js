import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducers'
import App from './containers/App.jsx';
import './style.css';
import './service/firebase';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({ forceRefresh: true });

const store = createStore(
  reducer,
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>	
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);