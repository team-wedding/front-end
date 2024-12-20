const BASE_URL = import.meta.env.VITE_API_URL;

export const API = {
  LOGIN: `${BASE_URL}/users/login`,
  SIGNUP: `${BASE_URL}/users/signup`,
  LOGOUT: `${BASE_URL}/users/logout`,
  REFRESH: `${BASE_URL}/users/refresh`,
  ACCOUNT: `${BASE_URL}/users/account`,
  INVITATIONS: `${BASE_URL}/invitations`,
  ATTENDANCE: `${BASE_URL}/attendances`,
};
