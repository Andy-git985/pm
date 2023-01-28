import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Divider, Drawer, ListItem, ListItemText, Button } from '@mui/material';

import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import MenuIcon from '@mui/icons-material/Menu';
import { filterNotes, setFilterBy } from '../reducers/filterReducer';

const ListItemContainer = styled('div')(() => ({
  cursor: 'pointer',
}));

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const notes = useSelector(({ notes }) => notes);
  const folders = notes
    .reduce((allFolders, current) => {
      if (!allFolders.includes(current.folder)) {
        return [...allFolders, current.folder];
      }
      return allFolders;
    }, [])
    .filter(Boolean);

  const handleClickFolder = (folder) => {
    dispatch(setFilterBy('folder'));
    dispatch(filterNotes(folder));
  };

  const handleClickAll = () => {
    dispatch(setFilterBy(null));
  };

  const getList = () => (
    <div onClick={() => setOpen(false)}>
      <ListItemContainer>
        <ListItem onClick={handleClickAll}>
          <FolderIcon sx={{ marginRight: '5px' }} />
          <ListItemText primary={'All'} />
        </ListItem>
        <Divider />
      </ListItemContainer>
      {folders.map((folder, index) => (
        <ListItemContainer key={`${folder}-${index + 1}`}>
          <ListItem onClick={() => handleClickFolder(folder)}>
            <FolderIcon sx={{ marginRight: '5px' }} />
            <ListItemText primary={folder} />
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
