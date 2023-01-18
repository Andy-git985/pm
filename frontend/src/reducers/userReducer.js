import { createSlice } from '@reduxjs/toolkit';
import { useLayoutEffect } from 'react';
import userService from '../services/user';

const userToken = document.cookie ? userService.getToken('jwt') : null;
const loggedIn = document.cookie ? true : false;
const accountInfo = null;

const initialState = {
  loggedIn,
  userToken,
  accountInfo,
};

// Is this the appropiate place as initialState does not have a user
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state, action) {
      document.cookie = 'jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      state.loggedIn = false;
      state.userToken = null;
    },
    remove(state, action) {
      const id = action.payload;
      state.loggedIn = false;
      state.userToken = null;
      return state.filter((user) => user.id !== id);
    },
    setUser(state, action) {
      state.accountInfo = action.payload;
    },
  },
});

export const { logout, remove, setUser } = userSlice.actions;

export const setUserInfo = () => {
  return async (dispatch) => {
    const user = await userService.getAccountInfo();
    dispatch(setUser(user));
  };
};
export const removeUser = (id) => {
  return async (dispatch) => {
    await userService.delete(id);
    // possibly log out is all I need
    dispatch(remove(id));
  };
};

export default userSlice.reducer;
