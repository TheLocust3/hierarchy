import { ThunkDispatch } from 'redux-thunk';
import { TreeActionTypes } from './actions/tree-actions';
import reducer from './reducers/root-reducer';

export type AppAction = TreeActionTypes;
export type AppState = ReturnType<typeof reducer>;

export type Dispatch = ThunkDispatch<AppState, null, AppAction>;
