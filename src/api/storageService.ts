import config from '../config/config';
const {storageKeys} = config;
const storageService = {
  setAccessToken(token: string) {
    localStorage.setItem(storageKeys.ACCESS_KEY, token);
  },

  getAccessToken() {
    return localStorage.getItem(storageKeys.ACCESS_KEY);
  },

  removeAccessToken() {
    localStorage.removeItem(storageKeys.ACCESS_KEY);
  },

  setRole(role: string) {
    localStorage.setItem('role', role);
  },

  getRole() {
    return localStorage.getItem('role');
  },

  removeRole() {
    localStorage.removeItem('role');
  },
};

export default storageService;
