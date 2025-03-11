// src/store/admin/adminReducer.js

import { USER_LOGIN, USER_LOGOUT, SET_COUNTRY, SET_PAF, DEL_PAF, REVISE_PAF_ADD, REVISE_PAF_DEL, OPEN_PAF_MODAL, CLOSE_PAF_MODAL,SET_USER_FORM,DEL_USER_FORM,QUERY_ANSWER_SET,QUERY_ANSWER_DEL,REMARKS_MODAL_CLOSE,REMARKS_MODAL_OPEN } from './userTypes';

const initialState = {
    current_user: null,
    token: null,
    countrydata: [],
    paf_selected: null,
    revise_details: null,
    paf_modal: false,
    user_form: null,
    query_answer:null,
    remarksmodal:false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                current_user: action.payload.userData,
                token: action.payload.token,
            };
        case USER_LOGOUT:
            return {
                ...state,
                current_user: null,
                token: null
            };
        case SET_COUNTRY:
            return {
                ...state,
                countrydata: action.payload
            };
        case SET_PAF:
            return {
                ...state,
                paf_selected: action.payload
            };
        case DEL_PAF:
            return {
                ...state,
                paf_selected: null
            };
        case SET_USER_FORM:
            return {
                ...state,
                user_form: action.payload
            };
        case DEL_USER_FORM:
            return {
                ...state,
                user_form: null
            };
        case REVISE_PAF_ADD:
            return {
                ...state,
                revise_details: action.payload
            };
        case REVISE_PAF_DEL:
            return {
                ...state,
                revise_details: null
            };
        case OPEN_PAF_MODAL:
            return {
                ...state,
                paf_modal: true
            };
        case CLOSE_PAF_MODAL:
            return {
                ...state,
                paf_modal: false
            };
        case QUERY_ANSWER_SET:
            return {
                ...state,
                query_answer: action.payload
            };
        case QUERY_ANSWER_DEL:
            return {
                ...state,
                query_answer: null
            };
        case REMARKS_MODAL_CLOSE:
            return {
                ...state,
                remarksmodal: false
            };
        case REMARKS_MODAL_OPEN:
            return {
                ...state,
                remarksmodal: true
            };
        default:
            return state;
    }
};

export default userReducer;