import {
  UserActionTypes,
  REQUEST_USER,
  RECEIVE_USER,
  CHANGE_PASSWORD,
  UPDATE_USER,
  SIGN_IN,
  SIGN_OUT
} from '../actions/user-actions';
import User from '../models/user/user';

export interface UserState {
  user: User;
  isReady: boolean;
}

const defaultUserState: UserState = {
  user: { email: 'test@test.com', name: 'test' },
  isReady: false
};

export function userReducer(
  state: UserState = defaultUserState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        isReady: false
      };
    case RECEIVE_USER:
      return {
        ...state,
        user: action.user,
        isReady: true
      };
    case CHANGE_PASSWORD:
      return state;
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, email: action.email }
      };
    case SIGN_IN:
      return state;
    case SIGN_OUT:
      return state;
    default:
      return state;
  }
}
