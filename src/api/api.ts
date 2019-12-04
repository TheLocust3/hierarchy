import { getCookie } from '../utils/cookies';

const Api = {
  get(endpoint: string): Promise<Response> {
    return fetch(endpoint, {
      method: 'GET',
      headers: { Authorization: `Bearer ${getCookie('token')}` }
    });
  },

  post(endpoint: string, body: any): Promise<Response> {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`
      },
      body: JSON.stringify(body)
    });
  },

  patch(endpoint: string, body: any): Promise<Response> {
    return fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`
      },
      body: JSON.stringify(body)
    });
  },

  delete(endpoint: string): Promise<Response> {
    return fetch(endpoint, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getCookie('token')}` }
    });
  }
};

export default Api;
