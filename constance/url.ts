<<<<<<< Updated upstream
const domain =  'http://localhost:3000/api/';
=======
const domain =  'http://localhost:3001/api/';
>>>>>>> Stashed changes

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
