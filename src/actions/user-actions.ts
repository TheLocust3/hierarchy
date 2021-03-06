import _ from 'lodash';
import { ThunkAction } from 'redux-thunk';

import { AppState } from '../types';
import User from '../models/user/user';
import UserApi from '../api/user-api';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const UPDATE_USER = 'UPDATE_USER';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const USER_REQUEST_ERROR = 'USER_REQUEST_ERROR';

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
}

interface UpdateUser {
  type: typeof UPDATE_USER;
  email: string;
}

interface SignIn {
  type: typeof SIGN_IN;
  email: string;
  password: string;
}

interface SignOut {
  type: typeof SIGN_OUT;
}

interface UserRequestError {
  type: typeof USER_REQUEST_ERROR;
  error: string;
}

export type UserActionTypes =
  | RequestUser
  | ReceiveUser
  | ChangePassword
  | UpdateUser
  | SignIn
  | SignOut
  | UserRequestError;

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

  changePassword(newPassword: string): UserActionTypes {
    return {
      type: CHANGE_PASSWORD,
      newPassword: newPassword
    };
  },

  updateUser(email: string): UserActionTypes {
    return {
      type: UPDATE_USER,
      email: email
    };
  },

  signIn(email: string, password: string): UserActionTypes {
    return {
      type: SIGN_IN,
      email: email,
      password: password
    };
  },

  signOut(): UserActionTypes {
    return {
      type: SIGN_OUT
    };
  },

  userRequestError(error: string): UserActionTypes {
    return {
      type: USER_REQUEST_ERROR,
      error: error
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
  newPassword: string
): ThunkAction<void, AppState, null, UserActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.changePassword(newPassword));

    const user = await UserApi.changePassword(newPassword);
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

export const signIn = (
  email: string,
  password: string
): ThunkAction<void, AppState, null, UserActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.signIn(email, password));

    UserApi.signIn(email, password).then((user) => {
      if (_.isUndefined(user)) {
        dispatch(InternalActions.userRequestError('Invalid email/password!'));
      } else {
        dispatch(InternalActions.receiveUser(user));
      }
    });
  };
};

export const signOut = (): ThunkAction<void, AppState, null, UserActionTypes> => {
  return async (dispatch) => {
    dispatch(InternalActions.signOut());

    UserApi.signOut();
  };
};
