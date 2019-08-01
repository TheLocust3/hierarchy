import { combineReducers } from 'redux';

import { treeReducer } from './tree-reducer';

const reducer = combineReducers({
  tree: treeReducer
});

export default reducer;
