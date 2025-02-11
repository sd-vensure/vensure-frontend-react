// src/store/admin/adminReducer.js

import { USER_LOGIN, USER_LOGOUT, SET_COUNTRY, SET_PAF, DEL_PAF, REVISE_PAF_ADD, REVISE_PAF_DEL } from './userTypes';

const initialState = {
    current_user: "manish",
    token: null,
    countrydata: [],
    paf_selected: null,
    revise_details: null
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
        default:
            return state;
    }
};

export default userReducer;