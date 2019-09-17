import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const colors = {
  black: '#444',
  lightBlack: '#999',

  actionHover: '#e0e0e0',
  actionShadow: '#bdbdbd',

  deleteRed: '#f44336',
  deleteRedHover: '#d32f2f',
  deleteRedActive: '#ab000d',

  viewBlue: '#64b5f6',
  viewBlueHover: '#42a5f5',
  viewBlueActive: '#2286c3',

  addGreen: '#a5d6a7',
  addGreenHover: '#81c784',
  addGreenActive: '#66bb6a',

  listPurple: '#ba68c8',
  listPurpleHover: '#ab47bc',
  listPurpleActive: '#9c27b0',

  nodeBackground: '#fafafa',
  nodeBackgroundDarker: '#f4f4f4',
  nodeBackgroundHover: '#eeeeee',
  dropdownHover: '#dddddd',

  themeMain: '#548aff',
  themeMainBackground: '#33373f',
  themeMainBackgroundDark: '#292c33',
  themeMainBackgroundLight: '#475166'
};

export const fonts = {
  title: "'Roboto Slab', serif",
  body: "'Roboto', sans-serif"
};

export const MAX_MOBILE_WIDTH = '768px';
export const MAX_MOBILE_WIDTH_NUMBER = 768;

export const TITLE = 'hierarchy';

export const API_ENDPOINT = 'http://127.0.0.1:4001/api/v1';
