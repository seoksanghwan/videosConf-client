import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger';
import reducer from './reducer'
import App from './containers/App.jsx';
import './style.css';
import './service/firebase';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      logger
    )
  )
);

render(
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <Route render={ props => <App {...props} history={history}/> } />
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);