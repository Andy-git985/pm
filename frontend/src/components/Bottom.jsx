import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterView } from '../reducers/filterReducer';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AppBar, Paper } from '@mui/material';

const Bottom = () => {
  const [value, setValue] = useState('recents');
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleNewNote = () => {
    dispatch(filterView('Note Form'));
  };

  return (
    // <Paper
    //   sx={{
    //     position: 'fixed',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     marginInline: 'auto',
    //   }}
    //   elevation={3}
    // >
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
        sx={{ width: '100%' }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
        />
        <BottomNavigationAction
          label="New"
          value="newNote"
          icon={<LibraryAddIcon />}
          onClick={handleNewNote}
        />
      </BottomNavigation>
    </AppBar>
    // </Paper>
  );
};

export default Bottom;
