// src/store/admin/adminHelper.js

import { USER_LOGIN, USER_LOGOUT,SET_COUNTRY,SET_PAF,DEL_PAF} from './userTypes';

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

export const setPaf = (data) => ({
  type: SET_PAF,
  payload:data
});
export const delPAf = () => ({
  type: DEL_PAF
});