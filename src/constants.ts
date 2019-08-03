import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const colors = {
  black: '#444',
  lightBlack: '#999',

  actionHover: '#e0e0e0',
  actionShadow: '#bdbdbd',
  deleteRed: '#f44336',
  viewBlue: '#64b5f6',
  addGreen: '#a5d6a7',
  addGreenHover: '#81c784',

  nodeBackground: '#fafafa',
  nodeBackgroundHover: '#eeeeee'
};

export const MAX_MOBILE_WIDTH = '768px';
export const MAX_MOBILE_WIDTH_NUMBER = 768;

export const TITLE = 'hierarchy';

export const API_ENDPOINT = 'http://127.0.0.1:4001/api/v1';
