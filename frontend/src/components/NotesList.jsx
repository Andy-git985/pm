import { useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemText } from '@mui/material';

const NotesList = () => {
  const notes = useSelector(({ notes }) => notes);
  const user = useSelector(({ user }) => user);
  return (
    <>
      <div>{user.displayName}</div>
      <List>
        {notes.map((note) => (
          <div key={note.id}>
            <ListItem>
              <ListItemText primary={note.title} secondary={note.content} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
};

export default NotesList;
