export default class Auth {
  static authenticate(token) {
    localStorage.setItem('app_token', token)
  }

  static isAuthenticated() {
    let token = localStorage.getItem('app_taken')
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  static logOut() {
    localStorage.setItem('app_token', null);
  }
}