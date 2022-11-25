import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getRole } from 'services/tokenService';

const PrivateRoutes = () => {
  return <div>{getRole() ? <Outlet /> : <Navigate to={'/login'} />}</div>;
};

export default PrivateRoutes;
