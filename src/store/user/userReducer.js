// src/store/admin/adminReducer.js

import { USER_LOGIN, USER_LOGOUT, SET_COUNTRY } from './userTypes';

const initialState = {
    current_user: "manish",
    token: null,
    countrydata: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            // console.log(action.payload, "this is payload")
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
        default:
            return state;
    }
};

export default userReducer;