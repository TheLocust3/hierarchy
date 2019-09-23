import { API_ENDPOINT } from '../constants';
import { UserResponse } from '../models/json/user-json';
import User from '../models/user/user';

const ListApi = {
  async getUser(): Promise<User> {
    const response = await fetch(`${API_ENDPOINT}/user`, { method: 'GET' });
    const json: UserResponse = await response.json();

    return json.user;
  }
};

export default ListApi;
