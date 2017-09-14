const domain =  'http://localhost:3001/api/';

const api = {
  auth: domain + 'auth',
  register: domain + 'register',
}

const domainProtect = domain + 'user/';

const protect = {

  refreshToken: domainProtect + 'refresh',
  auth: domainProtect + 'auth'

}

export const API = {api, protect};
