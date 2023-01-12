import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import noteReducer from './reducers/noteReducers';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    user: userReducer,
  },
});

export default store;
