import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';

import { AppState, AppAction } from './types';
import { history } from './constants';
import './global-styles';
import reducer from './reducers/root-reducer';

import Skeleton from './containers/Skeleton';
import RootRoutes from './routes/RootRoutes';

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppAction>)
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Skeleton>
          <RootRoutes />
        </Skeleton>
      </Router>
    </Provider>
  );
};

export default App;
