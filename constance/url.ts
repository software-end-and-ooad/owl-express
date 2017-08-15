const domain =  'http://localhost:3000/';

const api = {
  login: domain + 'auth',
  register: domain + 'register',
  refreshToken: domain + 'refresh-token'
}

export const API = api;
