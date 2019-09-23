import { ThunkAction } from 'redux-thunk';

import { AppState } from '../types';
import User from '../models/user/user';
import UserApi from '../api/user-api';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

interface RequestUser {
  type: typeof REQUEST_USER;
}

interface ReceiveUser {
  type: typeof RECEIVE_USER;
  user: User;
}

export type UserActionTypes = RequestUser | ReceiveUser;

const InternalActions = {
  requestUser(): UserActionTypes {
    return {
      type: REQUEST_USER
    };
  },

  receiveUser(user: User): UserActionTypes {
    return {
      type: RECEIVE_USER,
      user: user
    };
  }
};

export const getUser = (): ThunkAction<void, AppState, null, UserActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.requestUser());

    const user = await UserApi.getUser();
    dispatch(InternalActions.receiveUser(user));
  };
};
