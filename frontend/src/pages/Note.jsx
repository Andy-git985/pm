import { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import AppBarFinal from '../components/AppBarFinal';
import Bottom from '../components/Bottom';
import NoteForm from '../components/NoteForm';
import NotesList from '../components/NotesList';
import UpdateForm from '../components/UpdateForm';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Note = () => {
  const dispatch = useDispatch();
  const view = useSelector(({ filter }) => filter.view);
  const notes = useSelector(({ notes }) => notes);
  // const note =
  //   view && view !== 'Note Form'
  //     ? notes.find((note) => note.id === view)
  //     : null;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
          {view !== 'Note Form' && <UpdateForm />}
          <Button variant="outlined" onClick={handleClick}>
            Open success snackbar
          </Button>
          <Bottom sx={{ marginTop: '25px' }} />
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Note;
