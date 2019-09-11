import {
  ListActionTypes,
  REQUEST_LIST_ROOTED_AT,
  RECEIVE_LIST_ROOTED_AT
} from '../actions/list-actions';
import Column from '../models/card/column';

export interface ListState {
  list: ReadonlyArray<Column>;
  isReady: boolean;
}

const defaultListState: ListState = {
  list: [],
  isReady: false
};

export function listReducer(
  state: ListState = defaultListState,
  action: ListActionTypes
): ListState {
  switch (action.type) {
    case REQUEST_LIST_ROOTED_AT:
      return {
        ...state,
        isReady: false
      };
    case RECEIVE_LIST_ROOTED_AT:
      return {
        ...state,
        list: action.payload
          .slice()
          .sort((col1: Column, col2: Column) => col1.createdAt - col2.createdAt),
        isReady: true
      };
    default:
      return state;
  }
}
