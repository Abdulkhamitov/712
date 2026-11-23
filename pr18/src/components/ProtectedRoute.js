import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Можно перенаправить на /login и сохранить путь
    return <Navigate to="/" state={{ from: location, message: 'Доступ запрещён. Требуется авторизация.' }} replace />;
  }

  return children;
};

export default ProtectedRoute;
