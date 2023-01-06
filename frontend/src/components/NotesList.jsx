import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@mui/material';

const NotesList = () => {
  const notes = useSelector(({ notes }) => notes);
  return (
    <>
      <List>
        {notes.map((note) => (
          <ListItem>
            <ListItemText primary={note.content} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NotesList;
