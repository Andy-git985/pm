import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const Register = () => {
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
  const onSubmit = (data) => {
    console.log(data);
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
              required
              {...register('password')}
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
