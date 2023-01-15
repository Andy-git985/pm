import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeNotes } from './reducers/noteReducers';
import noteServices from './services/notes';
import Login from './pages/Login';
import Note from './pages/Note';
import Register from './pages/Register';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  const user = useSelector(({ user }) => user);
  if (user.loggedIn) {
    noteServices.setToken(user.userToken);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Note />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
