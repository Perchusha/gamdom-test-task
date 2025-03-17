import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../../stores';

export const PublicRoute = observer(() => {
  return authStore.isAuthenticated ? <Navigate to="/" /> : <Outlet />;
});
