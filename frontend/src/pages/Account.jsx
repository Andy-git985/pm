import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserInfo } from '../reducers/userReducer';

import userServices from '../services/user';
import user from '../services/user';

import { Button, Container } from '@mui/material';
import AppBarFinal from '../components/AppBarFinal';

// TODOS:
// 1: Change email
//    Enter new email
//    Confirm button
//    Confirm window
//    Notification
// 2: Change password
//    Confirm dropdown material ui
//    Form -
//    Enter old password
//    Enter new password
//    Enter new password again
//    Notification
// 3: Delete Account
//    Confirm Account
//    Windown confirm
//    For Each note {
//     if user is note.user {
//       delete note
//     }
//     if user is note.access.user {
//       delete note.access.user
//     }
//    }
//    Delete user
//    send response
const Account = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    userServices.getAccountInfo().then((info) => setUser(info));
  }, []);

  return (
    <>
      {/* Project does not link to project view */}
      <AppBarFinal />
      <Container>
        <div>My Account</div>
        <div>{user.displayName}</div>
        <div>{user.email}</div>
        <Button variant="contained">Delete Account</Button>
      </Container>
    </>
  );
};

export default Account;
