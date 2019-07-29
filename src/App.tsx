import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';

import { history } from './constants';
import './global-styles';
import reducer, { AppState } from './reducers/root-reducer';

import Index from './containers/Index';
import TreeView from './containers/TreeView';
import NotFound from './containers/NotFound';
import { AppAction } from './actions/app-action';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppAction>)
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/tree" component={TreeView} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
