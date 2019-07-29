import { combineReducers } from 'redux';

import { treeReducer } from './tree-reducer';

const reducer = combineReducers({
  tree: treeReducer
});

export type AppState = ReturnType<typeof reducer>;

export default reducer;
