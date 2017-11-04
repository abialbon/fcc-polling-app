export default class Auth {
  static authenticate(token) {
    localStorage.setItem('app_token', token)
  }

  static isAuthenticated() {
    let token = localStorage.getItem('app_token')
    if (token === 'null' || undefined) {
      return false;
    } else {
      return true;
    }
  }

  static getToken() {
    return localStorage.getItem('app_token');
  }

  static logout() {
    localStorage.setItem('app_token', 'null');
  }
}