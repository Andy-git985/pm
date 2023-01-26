import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterView } from '../reducers/filterReducer';
import { styled } from '@mui/material/styles';
import { Divider, List, ListItem, ListItemText } from '@mui/material';

const ListItemContainer = styled('div')(() => ({
  cursor: 'pointer',
}));

const contains = (obj, value) => {
  if (typeof obj === 'string' && obj.includes(value)) {
    return true;
  }
  if (typeof obj === 'object') {
  }
  return false;
};

const NotesList = () => {
  const dispatch = useDispatch();
  const search = useSelector(({ filter }) => filter.notes);
  const filter = useSelector(({ filter }) => filter.filterBy);
  const notes = useSelector(({ notes }) => notes);
  const filteredNotes =
    filter === 'folder'
      ? notes.filter((note) => note.folder === search)
      : filter === 'notes'
      ? notes.filter((note) =>
          Object.values(note).some((n) => contains(n, search))
        )
      : notes;
  const handleClick = (id) => {
    dispatch(filterView(id));
  };

  return (
    <>
      <List>
        {filteredNotes.map((note) => (
          <ListItemContainer key={note.id}>
            <ListItem onClick={() => handleClick(note.id)}>
              <ListItemText primary={note.title} secondary={note.content} />
            </ListItem>
            <Divider />
          </ListItemContainer>
        ))}
      </List>
    </>
  );
};

export default NotesList;
