import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../../stores';

export const ProtectedRoute = observer(() => {
  return authStore.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
});
