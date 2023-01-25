import { createSlice } from '@reduxjs/toolkit';
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
};

// Is this the appropiate place as initialState does not have a user
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
  },
});

export const { logout, remove, setUser, setUserDetails } = userSlice.actions;

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
export const removeUser = (id) => {
  return async (dispatch) => {
    await userService.delete(id);
    dispatch(logout());
  };
};

export default userSlice.reducer;
