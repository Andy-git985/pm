import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { registerUser } from '../reducers/userReducer';

const Register = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector(({ user }) => user);
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({});
  //   defaultValues: {
  //   email: '',
  //   password: '',
  // },

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      // set a error message
      return;
    }
    dispatchEvent(registerUser(data));
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3}>
        <Typography component="h1">Register</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '10px',
              padding: '5px',
            }}
          >
            <TextField
              label="First Name"
              required
              {...register('firstName')}
            ></TextField>
            <TextField
              label="Last Name"
              required
              {...register('lastName')}
            ></TextField>
            <TextField
              label="Email"
              required
              {...register('email')}
            ></TextField>
            <TextField
              label="Password"
              type="password"
              required
              {...register('password')}
            ></TextField>
            <TextField
              label="Confirm password"
              type="password"
              required
              {...register('confirmPassword')}
            ></TextField>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
