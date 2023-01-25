import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import AppBarFinal from '../components/AppBarFinal';
import Bottom from '../components/Bottom';
import NoteForm from '../components/NoteForm';
import NotesList from '../components/NotesList';

import { removeNote } from '../reducers/noteReducers';
import jwtServices from '../services/jwt';

const Note = () => {
  const dispatch = useDispatch();
  const view = useSelector(({ filter }) => filter.view);
  const notes = useSelector(({ notes }) => notes);
  const note =
    view && view !== 'Note Form'
      ? notes.find((note) => note.id === view)
      : null;
  const handleClick = (id) => {
    dispatch(removeNote(id));
  };
  return (
    <>
      <AppBarFinal />
      <Grid container columns={12}>
        <Grid
          item
          xs={2}
          sx={{ backgroundColor: 'white', height: 'calc(100vh - 64px)' }}
        >
          <NotesList />
        </Grid>
        <Grid
          item
          xs={10}
          sx={{
            backgroundColor: 'grey',
            height: 'calc(100vh - 64px)',
            padding: '2rem',
          }}
        >
          {view === 'Note Form' && <NoteForm />}
          {note && (
            <>
              <div>{note.title}</div>
              <div>{note.content}</div>
              <div>{note.folder}</div>
              <Button onClick={() => handleClick(note.id)}>Delete</Button>
            </>
          )}
          <Bottom sx={{ marginTop: '25px' }} />
        </Grid>
      </Grid>
    </>
  );
};

export default Note;
