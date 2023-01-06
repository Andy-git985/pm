import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './reducers/noteReducers';

const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});

export default store;
