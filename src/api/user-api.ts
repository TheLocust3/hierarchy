import { setCookie } from '../utils/cookies';
import Api from './api';
import { USER_API_ENDPOINT } from '../constants';
import { UserResponse, AuthResponse } from '../models/json/user-json';
import User from '../models/user/user';

const UserApi = {
  async getUser(): Promise<User> {
    const response = await Api.get(`${USER_API_ENDPOINT}/user`);
    const json: UserResponse = await response.json();

    return json.user;
  },

  async changePassword(password: string): Promise<User> {
    const response = await Api.patch(`${USER_API_ENDPOINT}/auth/password`, {
      password: password
    });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async updateUser(email: string): Promise<User> {
    const response = await Api.patch(`${USER_API_ENDPOINT}/user`, { email: email });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const response = await Api.post(`${USER_API_ENDPOINT}/auth`, {
      email: email,
      password: password
    });
    const json: AuthResponse = await response.json();

    setCookie('token', json.token, 1);

    return json.user;
  },

  signOut(): void {
    setCookie('token', '', 1);
  }
};

export default UserApi;
