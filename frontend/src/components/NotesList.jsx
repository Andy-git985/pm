import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterView } from '../reducers/filterReducer';
import { styled } from '@mui/material/styles';
import { Divider, List, ListItem, ListItemText } from '@mui/material';

const ListItemContainer = styled('div')(() => ({
  cursor: 'pointer',
}));

const NotesList = () => {
  const dispatch = useDispatch();
  const folder = useSelector(({ filter }) => filter.notes);
  console.log(folder);
  const notes = useSelector(({ notes }) => notes);
  const filteredNotes =
    folder === 'All' ? notes : notes.filter((note) => note.folder === folder);

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
