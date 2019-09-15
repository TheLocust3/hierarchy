import { ThunkAction } from 'redux-thunk';

import { AppState } from '../types';
import { createRelationship } from './tree-actions';
import Column from '../models/card/column';
import Label from '../models/label';
import Status from '../models/status';
import ListApi from '../api/list-api';

export const REQUEST_LIST_ROOTED_AT = 'REQUEST_LIST_ROOTED_AT';
export const RECEIVE_LIST_ROOTED_AT = 'RECEIVE_LIST_ROOTED_AT';

export const ADD_LABEL = 'ADD_LABEL';
export const SET_STATUS = 'SET_STATUS';

interface RequestListRootedAt {
  type: typeof REQUEST_LIST_ROOTED_AT;
}

interface ReceiveListRootedAt {
  type: typeof RECEIVE_LIST_ROOTED_AT;
  payload: ReadonlyArray<Column>;
}

interface AddLabel {
  type: typeof ADD_LABEL;
  label: Label;
  cardId: string;
}

interface SetStatus {
  type: typeof SET_STATUS;
  status: Status;
  cardId: string;
}

export type ListActionTypes = RequestListRootedAt | ReceiveListRootedAt | AddLabel | SetStatus;

const InternalActions = {
  requestListRootedAt(): ListActionTypes {
    return {
      type: REQUEST_LIST_ROOTED_AT
    };
  },

  receiveListRootedAt(cards: ReadonlyArray<Column>): ListActionTypes {
    return {
      type: RECEIVE_LIST_ROOTED_AT,
      payload: cards
    };
  },

  addLabel(label: Label, cardId: string): ListActionTypes {
    return {
      type: ADD_LABEL,
      label: label,
      cardId: cardId
    };
  },

  setStatus(status: Status, cardId: string): ListActionTypes {
    return {
      type: SET_STATUS,
      status: status,
      cardId: cardId
    };
  }
};

export const getCardsRootedAt = (
  rootId: string
): ThunkAction<void, AppState, null, ListActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.requestListRootedAt());

    const cards = await ListApi.getListRootedAt(rootId);
    dispatch(InternalActions.receiveListRootedAt(cards));
  };
};

export const addLabel = (
  label: Label,
  cardId: string
): ThunkAction<void, AppState, null, ListActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.addLabel(label, cardId));
    dispatch(createRelationship(label.id, cardId));
  };
};

export const setStatus = (
  status: Status,
  cardId: string
): ThunkAction<void, AppState, null, ListActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.setStatus(status, cardId));
    dispatch(createRelationship(status.id, cardId));
  };
};
