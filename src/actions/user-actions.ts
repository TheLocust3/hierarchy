import { ThunkAction } from 'redux-thunk';

import { AppState } from '../types';
import User from '../models/user/user';
import UserApi from '../api/user-api';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const UPDATE_USER = 'UPDATE_USER';

interface RequestUser {
  type: typeof REQUEST_USER;
}

interface ReceiveUser {
  type: typeof RECEIVE_USER;
  user: User;
}

interface ChangePassword {
  type: typeof CHANGE_PASSWORD;
  newPassword: string;
  newPasswordConfirmation: string;
}

interface UpdateUser {
  type: typeof UPDATE_USER;
  email: string;
}

export type UserActionTypes = RequestUser | ReceiveUser | ChangePassword | UpdateUser;

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
  },

  changePassword(newPassword: string, newPasswordConfirmation: string): UserActionTypes {
    return {
      type: CHANGE_PASSWORD,
      newPassword: newPassword,
      newPasswordConfirmation: newPasswordConfirmation
    };
  },

  updateUser(email: string): UserActionTypes {
    return {
      type: UPDATE_USER,
      email: email
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

export const changePassword = (
  newPassword: string,
  newPasswordConfirmation: string
): ThunkAction<void, AppState, null, UserActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.changePassword(newPassword, newPasswordConfirmation));

    const user = await UserApi.changePassword(newPassword, newPasswordConfirmation);
    dispatch(InternalActions.receiveUser(user));
  };
};

export const updateUser = (email: string): ThunkAction<void, AppState, null, UserActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.updateUser(email));

    const user = await UserApi.updateUser(email);
    dispatch(InternalActions.receiveUser(user));
  };
};
