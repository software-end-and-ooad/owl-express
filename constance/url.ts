const domain =  'http://localhost:3000/api/';

const api = {
  auth: domain + 'auth',
  register: domain + 'register',
  forgetpwd: domain + 'forget-password',
  resetpwd: domain + 'reset-password',
  activate: domain + 'activate',
}

const domainProtect = domain + 'user/';

const protect = {

  refreshToken: domainProtect + 'refresh',
  auth: domainProtect + 'auth'

}

// ============ ADMIN =============

const adminDomain = domain + 'admin/'

const admin = {
  auth: adminDomain + 'auth'
}

export const API = {api, protect, admin};
