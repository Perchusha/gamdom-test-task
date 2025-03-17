import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { authStore } from '../../stores';

export const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await authStore.login(username, password);
    if (authStore.isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <Stack maxWidth={'600px'} width={'50%'} minWidth={'260px'} margin={'0 auto'}>
      <Typography variant="h5">Login</Typography>
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
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
        <Button onClick={() => navigate('/register')} color="secondary">
          No account? Register
        </Button>
      </Stack>
    </Stack>
  );
};
