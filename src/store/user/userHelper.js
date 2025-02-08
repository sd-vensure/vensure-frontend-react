// src/store/admin/adminHelper.js

import { USER_LOGIN, USER_LOGOUT,SET_COUNTRY} from './userTypes';

export const userLogin = (userData, token) => ({
  type: USER_LOGIN,
  payload: { userData, token },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const setCountry = (data) => ({
  type: SET_COUNTRY,
  payload:data
});