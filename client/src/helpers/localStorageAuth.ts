import { UserAuth } from "../models/user";

const USER_AUTH_LOCAL = "user_auth";

class LocalStorageAuth {
  static setAuth(user: UserAuth) {
    localStorage.setItem(USER_AUTH_LOCAL, JSON.stringify(user));
  }

  static getAuth() {
    const localUser = localStorage.getItem(USER_AUTH_LOCAL);
    if (!localUser) {
      return null;
    }

    return JSON.parse(localUser) as UserAuth;
  }

  static destroySession() {
    localStorage.removeItem(USER_AUTH_LOCAL);
  }
}

export default LocalStorageAuth;
