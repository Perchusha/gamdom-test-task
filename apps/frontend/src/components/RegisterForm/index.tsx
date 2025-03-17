import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { authStore } from '../../stores';

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await authStore.register(username, password);
  };

  return (
    <Stack maxWidth={'600px'} width={'50%'} minWidth={'260px'} margin={'0 auto'}>
      <Typography variant="h5">Register</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleRegister} variant="contained" color="primary">
          Register
        </Button>

        <Button onClick={() => navigate('/login')} color="secondary">
          Already have an account? Log in
        </Button>
      </Stack>
    </Stack>
  );
};
