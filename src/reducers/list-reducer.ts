import moment from 'moment';

import {
  ListActionTypes,
  REQUEST_LIST_ROOTED_AT,
  RECEIVE_LIST_ROOTED_AT
} from '../actions/list-actions';
import { TreeActionTypes, UPDATE_NODE, DELETE_NODE, REPLACE_NODE } from '../actions/tree-actions';
import Column from '../models/card/column';
import Card from '../models/card/card';

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
  action: ListActionTypes | TreeActionTypes
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
    case UPDATE_NODE:
      return {
        ...state,
        list: state.list.map((column: Column) =>
          column.replaceCardById(action.id, new Card(action.id, action.data, moment().valueOf()))
        )
      };
    case DELETE_NODE:
      return {
        ...state,
        list: state.list.map((column) => column.deleteCardById(action.id))
      };
    case REPLACE_NODE:
      return {
        ...state,
        list: state.list.map((column: Column) =>
          column.replaceCardById(action.id, Card.fromITree(action.node))
        )
      };
    default:
      return state;
  }
}
