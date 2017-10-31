const domain =  'http://localhost:3000/api/';

const api = {
  auth: domain + 'login',
  register: domain + 'register',
  forgetpwd: domain + 'forget-password',
  resetpwd: domain + 'reset-password',
  activate: domain + 'activate',
  province: domain + 'province',
  district: domain + 'district/',
  subdistrict: domain + 'subdistrict/',
}

const domainProtect = domain + 'user/';

const protect = {

  refreshToken: domainProtect + 'refresh',
  auth: domainProtect + 'login',
  order: domainProtect + 'order',
  orderList: domainProtect + 'order-list',

}

// ============ ADMIN =============

const adminDomain = domain + 'admin/'

const admin = {
  auth: adminDomain + 'login',
  resetpwd: adminDomain + 'reset-password',
  forgetpwd: adminDomain + 'send-activate/', // send-activate equal send-resetpassword or forgetpwd
}

const adminProtectDomain = adminDomain + 'protect/'

const adminProtect = {
  auth: adminProtectDomain + 'login',
  refreshToken: adminProtectDomain + 'refresh',
  getAllUser: adminProtectDomain  + 'getalluser',
  edituser: adminProtectDomain + 'edituser/',
  getAllOrder: adminProtectDomain + 'allorder',
  editOrder: adminProtectDomain + 'editorder/',
  getAllOfficer: adminProtectDomain + 'getallofficer',
  editOfficer: adminProtectDomain + 'editofficer',
  addOfficer: adminProtectDomain + 'addofficer',
}

export const API = {api, protect, admin, adminProtect};
