import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store, history } from './constants';
import './global-styles';

import Index from './containers/Index';
import TreeView from './containers/TreeView';
import NotFound from './containers/NotFound';

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
