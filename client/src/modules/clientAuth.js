export default class Auth {
  static authenticate(token) {
    localStorage.setItem('app_token', token)
  }

  static isAuthenticated() {
    let token = localStorage.getItem('app_token')
    if (token === 'null') {
      return false;
    } else {
      return true;
    }
  }

  static logout() {
    localStorage.setItem('app_token', 'null');
  }
}