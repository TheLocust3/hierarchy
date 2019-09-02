import { ThunkAction } from 'redux-thunk';

import { AppState } from '../types';
import Column from '../models/card/column';
import ListApi from '../api/list-api';

export const REQUEST_LIST_ROOTED_AT = 'REQUEST_LIST_ROOTED_AT';
export const RECEIVE_LIST_ROOTED_AT = 'RECEIVE_LIST_ROOTED_AT';

interface RequestListRootedAt {
  type: typeof REQUEST_LIST_ROOTED_AT;
}

interface ReceiveListRootedAt {
  type: typeof RECEIVE_LIST_ROOTED_AT;
  payload: ReadonlyArray<Column>;
}

export type ListActionTypes = RequestListRootedAt | ReceiveListRootedAt;

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
