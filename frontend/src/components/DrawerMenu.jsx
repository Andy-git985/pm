import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Drawer, ListItem, ListItemText, Button } from '@mui/material';

import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);
  const notes = useSelector(({ notes }) => notes);

  const getList = () => (
    <div onClick={() => setOpen(false)}>
      {notes.map((item) => (
        <div key={item.id}>
          <ListItem>
            <FolderIcon />
            <ListItemText primary={item.folder} />
          </ListItem>
          <Divider />
        </div>
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
