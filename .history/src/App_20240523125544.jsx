// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './components/contexts/AuthContext';
import LoginPage from './components/pages/LoginPage';
import RegistrationForm from './components/pages/RegistrationPage';

const AdminDashboard = lazy(() => import('./components/pages/AdminDashboard'));

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const theme = createTheme({
  // Customize your theme here
});

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress />
  </Box>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/admin/*"  element={<ProtectedRoute element={<AdminDashboard />} />} />
          </Routes>
        </Suspense>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
