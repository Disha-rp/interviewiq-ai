import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import UIShowcase from '../pages/UIShowcase';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/showcase" replace />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/showcase" element={<UIShowcase />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
