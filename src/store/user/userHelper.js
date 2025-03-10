// src/store/admin/adminHelper.js

import { USER_LOGIN, USER_LOGOUT, SET_COUNTRY, SET_PAF, DEL_PAF, REVISE_PAF_ADD, REVISE_PAF_DEL, OPEN_PAF_MODAL, CLOSE_PAF_MODAL,SET_USER_FORM,DEL_USER_FORM,QUERY_ANSWER_SET,QUERY_ANSWER_DEL } from './userTypes';

export const userLogin = (userData, token) => ({
  type: USER_LOGIN,
  payload: { userData, token },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const setCountry = (data) => ({
  type: SET_COUNTRY,
  payload: data
});

export const setPaf = (data) => ({
  type: SET_PAF,
  payload: data
});

export const delPAf = () => ({
  type: DEL_PAF
});


export const setUserForm = (data) => ({
  type: SET_USER_FORM,
  payload: data
});

export const delUserForm = () => ({
  type: DEL_USER_FORM
});

export const setPafRevise = (data) => ({
  type: REVISE_PAF_ADD,
  payload: data
});

export const delPAfRevise = () => ({
  type: REVISE_PAF_DEL
});

export const setQueryAnswer = (data) => ({
  type: QUERY_ANSWER_SET,
  payload: data
});

export const delQueryAnswer = () => ({
  type: QUERY_ANSWER_DEL
});

export const openPAFModal = () => ({
  type: OPEN_PAF_MODAL
});
export const closePAFModal = () => ({
  type: CLOSE_PAF_MODAL
});