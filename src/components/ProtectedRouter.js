// src/components/ProtectedRoute.js

;
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../auth'; 

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default ProtectedRoute;
