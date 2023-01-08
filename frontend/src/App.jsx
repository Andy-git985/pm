import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeNotes } from './reducers/noteReducers';
import { AppBar, Box, Grid, Paper } from '@mui/material';
import Note from './pages/Note';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <>
      <Note />
    </>
  );
};
export default App;
