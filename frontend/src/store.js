import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import noteReducer from './reducers/noteReducers';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    user: userReducer,
    filter: filterReducer,
  },
});

export default store;
