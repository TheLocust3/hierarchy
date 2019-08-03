import { ThunkDispatch } from 'redux-thunk';
import { TreeActionTypes, setOverlay } from './actions/tree-actions';
import { TreeState } from './reducers/tree-reducer';

export type AppAction = TreeActionTypes;
export interface AppState {
  tree: TreeState;
}

export type Dispatch = ThunkDispatch<AppState, null, AppAction>;

export interface RouterParams {}

export interface RouterMatch<T extends RouterParams> {
  params: T
}
