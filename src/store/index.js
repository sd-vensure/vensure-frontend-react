// src/store/index.js

import { legacy_createStore as createStore } from 'redux'
import rootReducer from './rootReducer';

const store = createStore(
    rootReducer,
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ 
      ? window.__REDUX_DEVTOOLS_EXTENSION__() 
      : f => f // No-op function if devtools is not available
  );

export default store;