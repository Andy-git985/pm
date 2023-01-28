import { createSlice } from '@reduxjs/toolkit';
import { useLayoutEffect } from 'react';
import userService from '../services/user';

const getToken = (key) => {
  let value = '';
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1];
    }
  });
  return value;
};

const userToken = document.cookie ? getToken('jwt') : null;

const initialState = {
  userToken,
  userInfo: null,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state, action) {
      document.cookie = 'jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      state.userToken = null;
      state.userInfo = null;
    },
    setUser(state, action) {
      const user = action.payload;
      state.userToken = user.token;
      state.userInfo = user.user;
    },
    setUserDetails(state, action) {
      state.userInfo = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const { logout, remove, setMessage, setUser, setUserDetails } =
  userSlice.actions;

export const registerUser = (data) => {
  return async (dispatch) => {
    const user = await userService.register(data);
    dispatch(setUser(user));
  };
};
export const logInUser = (data) => {
  return async (dispatch) => {
    const user = await userService.login(data);
    dispatch(setUser(user));
  };
};
export const getUserDetails = () => {
  return async (dispatch) => {
    const details = await userService.getAccountInfo();
    dispatch(setUserDetails(details));
  };
};
export const removeUser = () => {
  return async (dispatch) => {
    await userService.remove();
    dispatch(logout());
  };
};

export const changeUserEmail = (data) => {
  return async (dispatch) => {
    const updatedUser = await userService.updateEmail(data);
    dispatch(setUserDetails(updatedUser));
  };
};

export const changeUserPassword = (data) => {
  return async (dispatch) => {
    const updatedUser = await userService.updatePassword(data);
    console.log(updatedUser.data.json());
    if (updatedUser.error) {
      dispatch(setMessage(updatedUser.error));
    }
    dispatch(setUserDetails(updatedUser));
  };
};

export default userSlice.reducer;
