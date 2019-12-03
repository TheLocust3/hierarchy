import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from '../containers/Index';
import AppRoutes from './AppRoutes';

const RootRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Index} />

      <Route component={AppRoutes} />
    </Switch>
  );
};

export default RootRoutes;
