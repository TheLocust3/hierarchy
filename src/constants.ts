import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';

import reducer from './reducers/root-reducer';

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export const history = createBrowserHistory();

export const colors = {
  textBlack: '#444'
};

export const MAX_MOBILE_WIDTH = '768px';
export const MAX_MOBILE_WIDTH_NUMBER = 768;

export const TITLE = 'hierarchy';
