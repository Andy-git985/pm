import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeNotes } from './reducers/noteReducers';
import { getUserDetails } from './reducers/userReducer';
import jwtServices from './services/jwt';
import Account from './pages/Account';
import Login from './pages/Login';
import Note from './pages/Note';
import Register from './pages/Register';

const App = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  useEffect(() => {
    if (userToken) {
      jwtServices.setToken(userToken);
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Note />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
