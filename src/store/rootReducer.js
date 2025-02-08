// src/store/reducers/index.js

import { combineReducers } from 'redux';
import userReducer from './user/userReducer'; // Import the adminReducer

const rootReducer = combineReducers({
  user: userReducer
  // Add other reducers here
});

export default rootReducer;