import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import authServices from '../services/auth';
import Google from '../img/google.png';

const Login = () => {
  const [user, setUser] = useState('');

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data) => {
    const user = await authServices.login(data);
    setUser(user);
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
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px',
          padding: '5px',
        }}
      >
        <div>{user.displayName}</div>
        <Typography component="h1">Log In</Typography>
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
              label="Email"
              required
              {...register('email')}
            ></TextField>
            <TextField
              label="Password"
              required
              {...register('password')}
            ></TextField>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
        <img
          src={Google}
          alt="google-logo"
          style={{
            backgroundColor: 'black',
            width: '35px',
            padding: '5px',
            borderRadius: '50%',
          }}
        ></img>
      </Paper>
    </Container>
  );
};

export default Login;
