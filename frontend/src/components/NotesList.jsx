import { useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemText } from '@mui/material';

const NotesList = () => {
  const notes = useSelector(({ notes }) => notes);
  return (
    <>
      <List>
        {notes.map((note) => (
          <div key={note.id}>
            <ListItem>
              <ListItemText primary={note.content} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
};

export default NotesList;
