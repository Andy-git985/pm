import { useState } from 'react';
import { Drawer, ListItem, ListItemText, Button } from '@mui/material';
import { users, notes } from '../user';

import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div onClick={() => setOpen(false)}>
      {notes.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item.folder} />
        </ListItem>
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
