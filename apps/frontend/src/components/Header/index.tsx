import { observer } from 'mobx-react-lite';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useLayoutContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores';

export const Header = observer(() => {
  const { headerRef } = useLayoutContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" ref={headerRef}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h6"
          onClick={() => navigate('/')}
          sx={{ flexGrow: 1, cursor: 'pointer' }}
        >
          Betting App
        </Typography>
        {authStore.isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate('/register')}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
});
