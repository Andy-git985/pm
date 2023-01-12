import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeNotes } from './reducers/noteReducers';
import Login from './pages/Login';
import Note from './pages/Note';
import Register from './pages/Register';

const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(initializeNotes());
  // }, [dispatch]);

  return (
    // <Register />
    <Login />
  );
};
export default App;
