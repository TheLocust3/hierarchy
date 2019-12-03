import { setCookie } from '../utils/cookies';
import { USER_API_ENDPOINT } from '../constants';
import { UserResponse, AuthResponse } from '../models/json/user-json';
import User from '../models/user/user';

const UserApi = {
  async getUser(): Promise<User> {
    const response = await fetch(`${USER_API_ENDPOINT}/user`, { method: 'GET' });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async changePassword(newPassword: string, newPasswordConfirmation: string): Promise<User> {
    const response = await fetch(`${USER_API_ENDPOINT}/auth/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newPassword: newPassword,
        newPasswordConfirmation: newPasswordConfirmation
      })
    });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async updateUser(email: string): Promise<User> {
    const response = await fetch(`${USER_API_ENDPOINT}/user`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email
      })
    });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const response = await fetch(`${USER_API_ENDPOINT}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
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
