import { useState } from 'react';
import { Divider, Drawer, ListItem, ListItemText, Button } from '@mui/material';
import { users, notes } from '../data';

import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div onClick={() => setOpen(false)}>
      {notes.map((item) => (
        <div key={item.id}>
          <ListItem>
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
