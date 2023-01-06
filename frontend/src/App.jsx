import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeNotes } from './reducers/noteReducers';
import { Grid } from '@mui/material';
import AppBarFinal from './components/AppBarFinal';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);
  return (
    <>
      <AppBarFinal />
      <Grid container columns={12}>
        <Grid
          item
          xs={3}
          sx={{ backgroundColor: 'white', height: 'calc(100vh - 64px)' }}
        >
          <NotesList />
        </Grid>
        <Grid
          item
          xs={9}
          sx={{ backgroundColor: 'grey', height: 'calc(100vh - 64px)' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam et
          voluptas voluptatum fugiat corporis deleniti ab quaerat, repudiandae
          beatae eaque inventore saepe, ipsum fugit impedit fuga vel adipisci
          eum, optio amet quae! Dolore porro pariatur sit voluptas laudantium,
          similique nulla a velit praesentium accusamus explicabo quod veniam
          vel? Sed optio exercitationem doloremque accusantium, dignissimos sunt
          mollitia illo provident itaque tempore, nam dolore in nihil ab
          voluptate saepe neque delectus excepturi veniam. Saepe ratione ex
          dolore! Saepe deserunt, iusto officia labore laboriosam ex nihil ullam
          minus ad quia, placeat molestiae accusamus tempora repellendus
          praesentium nobis ut! Accusantium labore magni impedit possimus?
        </Grid>
      </Grid>
    </>
  );
};
export default App;
