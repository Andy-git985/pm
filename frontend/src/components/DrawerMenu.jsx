import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Divider, Drawer, ListItem, ListItemText, Button } from '@mui/material';

import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import MenuIcon from '@mui/icons-material/Menu';
import { filterNotes } from '../reducers/filterReducer';

const ListItemContainer = styled('div')(() => ({
  cursor: 'pointer',
}));

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const notes = useSelector(({ notes }) => notes);

  const handleClick = (folder) => {
    dispatch(filterNotes(folder));
  };

  const getList = () => (
    <div onClick={() => setOpen(false)}>
      <ListItemContainer>
        <ListItem onClick={() => handleClick('All')}>
          <FolderIcon sx={{ marginRight: '5px' }} />
          <ListItemText primary={'All'} />
        </ListItem>
        <Divider />
      </ListItemContainer>
      {notes.map((note) => (
        <ListItemContainer key={note.id}>
          <ListItem onClick={() => handleClick(note.folder)}>
            <FolderIcon sx={{ marginRight: '5px' }} />
            <ListItemText primary={note.folder} />
          </ListItem>
          <Divider />
        </ListItemContainer>
      ))}
    </div>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={'left'} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </>
  );
};

export default DrawerMenu;
