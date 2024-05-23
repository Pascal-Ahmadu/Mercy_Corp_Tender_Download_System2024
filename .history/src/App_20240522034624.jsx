// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegistrationForm from './components/pages/RegistrationPage';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { useAuth } from './components/contexts/AuthContext';
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
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <div style={{ backgroundColor: 'white' }}></div>
    <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/admin" component={AdminDashboard} />

      </Routes>
      </Suspense>
    </Router>
    </ThemeProvider>
  );
};

export default App;
