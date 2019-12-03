import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from '../containers/Index';
import RootTreeView from '../containers/tree/RootTreeView';
import RootListView from '../containers/tree/list/RootListView';
import TreeView from '../containers/tree/TreeView';
import ListView from '../containers/tree/list/ListView';
import Settings from '../containers/Settings';
import NotFound from '../containers/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/tree" component={RootTreeView} />
      <Route exact path="/tree/:id" component={TreeView} />
      <Route exact path="/tree/:id/list" component={ListView} />

      <Route exact path="/lists" component={RootListView} />

      <Route exact path="/settings" component={Settings} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
