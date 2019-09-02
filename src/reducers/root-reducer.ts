import { combineReducers } from 'redux';

import { treeReducer } from './tree-reducer';
import { listReducer } from './list-reducer';

const reducer = combineReducers({
  tree: treeReducer,
  list: listReducer
});

export default reducer;
