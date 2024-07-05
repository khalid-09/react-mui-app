import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../validation/login';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const LoginForm = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
    },
  });

  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = (data: LoginSchema) => {
    localStorage.setItem('userDetails', JSON.stringify(data));
    reset();
    navigate('/dashboard');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
      }}
    >
      <Typography variant="h5" component="h1">
        User Information
      </Typography>
      {state?.message && <Typography color="error">{state.message}</Typography>}
      <TextField
        label="Name"
        variant="outlined"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Phone"
        variant="outlined"
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone ? errors.phone.message : ''}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </Box>
  );
};

export default LoginForm;
