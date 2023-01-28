import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeUserEmail,
  changeUserPassword,
  removeUser,
  setMessage,
} from '../reducers/userReducer';
import { Button, Container, TextField, Typography } from '@mui/material';
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

const ChangeEmail = ({ handleChange, handleSubmit }) => {
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        label="Change Email"
        variant="outlined"
        color="secondary"
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
};

const ChangePassword = ({
  handleOldPasswordChange,
  handleNewPasswordChange,
  handleNewPasswordConfirm,
  handleSubmit,
  newError,
  confirmError,
}) => {
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        onChange={handleOldPasswordChange}
        type="password"
        label="Old Password"
        variant="outlined"
        color="secondary"
        fullWidth
        required
      />
      <TextField
        onChange={handleNewPasswordChange}
        type="password"
        label="New Password"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={newError}
      />
      <TextField
        onChange={handleNewPasswordConfirm}
        type="password"
        label="Confirm New Password"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={confirmError}
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
};

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(({ user }) => user);
  const { message } = useSelector(({ user }) => user);

  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newError, setNewError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    // run email validation
    dispatch(changeUserEmail({ email: newEmail }));
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleNewPasswordConfirm = (event) => {
    setNewPasswordConfirm(event.target.value);
  };
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setNewError(false);
    setConfirmError(false);
    dispatch(setMessage(''));

    // console.log(oldPassword, newPassword, newPasswordConfirm);
    if (newPassword === '') {
      setNewError(true);
      return;
    }
    if (newPasswordConfirm === '') {
      setConfirmError(true);
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setNewError(true);
      setConfirmError(true);
      dispatch(setMessage('Passwords do not match'));
      return;
    }
    dispatch(
      changeUserPassword({ oldPassword, newPassword, newPasswordConfirm })
    );
  };

  const handleDelete = () => {
    dispatch(removeUser());
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <>
      {/* Project does not link to project view */}
      <AppBarFinal />
      <Container>
        <h1>{message}</h1>
        <div>My Account</div>
        <div>{userInfo?.displayName}</div>
        <div>{userInfo?.email}</div>
        <div>{newEmail}</div>
        <ChangeEmail
          handleChange={handleEmailChange}
          handleSubmit={handleEmailSubmit}
        />
        <ChangePassword
          newError={newError}
          confirmError={confirmError}
          handleOldPasswordChange={handleOldPasswordChange}
          handleNewPasswordChange={handleNewPasswordChange}
          handleNewPasswordConfirm={handleNewPasswordConfirm}
          handleSubmit={handlePasswordSubmit}
        />
        <Button variant="contained" onClick={handleDelete}>
          Delete Account
        </Button>
        <div>{message}</div>
      </Container>
    </>
  );
};

export default Account;
