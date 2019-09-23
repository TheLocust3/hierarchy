import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';

import { AppState, AppAction } from './types';
import { history } from './constants';
import './global-styles';
import reducer from './reducers/root-reducer';

import Skeleton from './containers/Skeleton';
import Index from './containers/Index';
import RootTreeView from './containers/tree/RootTreeView';
import RootListView from './containers/tree/list/RootListView';
import TreeView from './containers/tree/TreeView';
import ListView from './containers/tree/list/ListView';
import Settings from './containers/Settings';
import NotFound from './containers/NotFound';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppAction>)
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Skeleton>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/tree" component={RootTreeView} />
            <Route exact path="/tree/:id" component={TreeView} />
            <Route exact path="/tree/:id/list" component={ListView} />

            <Route exact path="/lists" component={RootListView} />

            <Route exact path="/settings" component={Settings} />

            <Route component={NotFound} />
          </Switch>
        </Skeleton>
      </Router>
    </Provider>
  );
};

export default App;
