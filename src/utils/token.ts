import Cookies, { getCookie, removeCookie } from 'typescript-cookie';

const TOKEN_KEY = 'token';
const ROLES_KEY = 'roles';

export function getToken() {
  return getCookie(TOKEN_KEY);
}

export function removeToken() {
  return removeCookie(TOKEN_KEY);
}

export function getRoles() {
  return getCookie(ROLES_KEY);
}

export function removeRoles() {
  return getCookie(ROLES_KEY);
}

// export function getUserInfo() {
//   return (localStorage as any).getItem(USER_KEY)
// }

// export function removeUserInfo() {
//   return localStorage.removeItem(USER_KEY);
// }

// export function getUser() {
//   return Cookies.get(USER_KEY);
// }
