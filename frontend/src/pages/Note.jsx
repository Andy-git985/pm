import { Grid } from '@mui/material';
import AppBarFinal from '../components/AppBarFinal';
import Bottom from '../components/Bottom';
import NoteForm from '../components/NoteForm';
import NotesList from '../components/NotesList';

const Note = () => {
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
          <NoteForm />
          <Bottom sx={{ marginTop: '25px' }} />
        </Grid>
      </Grid>
    </>
  );
};

export default Note;
