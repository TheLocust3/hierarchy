import { API_ENDPOINT } from '../constants';
import { UserResponse, UserSuccessResponse } from '../models/json/user-json';
import User from '../models/user/user';

const UserApi = {
  async getUser(): Promise<User> {
    const response = await fetch(`${API_ENDPOINT}/user`, { method: 'GET' });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async changePassword(newPassword: string, newPasswordConfirmation: string): Promise<User> {
    const response = await fetch(`${API_ENDPOINT}/user/password`, {
      method: 'PATCH',
      body: JSON.stringify({
        newPassword: newPassword,
        newPasswordConfirmation: newPasswordConfirmation
      })
    });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async updateUser(email: string): Promise<User> {
    const response = await fetch(`${API_ENDPOINT}/user`, {
      method: 'PATCH',
      body: JSON.stringify({
        email: email
      })
    });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const response = await fetch(`${API_ENDPOINT}/sign_in`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const json: UserResponse = await response.json();

    return json.user;
  },

  async signOut(): Promise<string> {
    const response = await fetch(`${API_ENDPOINT}/sign_out`, {
      method: 'DELETE'
    });
    const json: UserSuccessResponse = await response.json();

    return json.success;
  }
};

export default UserApi;
