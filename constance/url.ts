const domain =  'http://localhost:3000/api/';

const api = {
  auth: domain + 'auth',
  register: domain + 'register',
  forgetpwd: domain + 'forget-password',
  resetpwd: domain + 'reset-password'
}

const domainProtect = domain + 'user/';

const protect = {

  refreshToken: domainProtect + 'refresh',
  auth: domainProtect + 'auth'

}

export const API = {api, protect};
