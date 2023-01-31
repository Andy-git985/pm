import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeNotes } from './reducers/noteReducers';
import { getUserDetails } from './reducers/userReducer';
import jwtServices from './services/jwt';
import ProtectedRoute from './routing/ProtectedRoute';
import Account from './pages/Account';
import Login from './pages/Login';
import Note from './pages/Note';
import Register from './pages/Register';
import Kanban from './pages/Kanban';
import Test from './pages/Test';

const App = () => {
  const dispatch = useDispatch();
  const { userToken } = useSelector(({ user }) => user);

  useEffect(() => {
    if (userToken) {
      jwtServices.setToken(userToken);
      dispatch(initializeNotes());
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Note />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user/account" element={<Account />} />
          <Route path="/kanban" element={<Kanban />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <Test />
  );
};
export default App;
