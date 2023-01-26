import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserInfo, removeUser } from '../reducers/userReducer';

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
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ user }) => user);

  const handleClick = () => {
    dispatch(removeUser());
  };

  return (
    <>
      {/* Project does not link to project view */}
      <AppBarFinal />
      <Container>
        <div>My Account</div>
        <div>{userInfo?.displayName}</div>
        <div>{userInfo?.email}</div>
        <Button variant="contained" onClick={handleClick}>
          Delete Account
        </Button>
      </Container>
    </>
  );
};

export default Account;
