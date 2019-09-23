import { combineReducers } from 'redux';

import { treeReducer } from './tree-reducer';
import { listReducer } from './list-reducer';
import { userReducer } from './user-reducer';

const reducer = combineReducers({
  tree: treeReducer,
  list: listReducer,
  user: userReducer
});

export default reducer;
