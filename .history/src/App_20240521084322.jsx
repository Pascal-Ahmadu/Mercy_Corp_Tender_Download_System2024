// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { useAuth } from './components/contexts/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const theme = createTheme({
  // Customize your theme here
});

const App = () => {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <div style={{ backgroundColor: 'white', minHeight: '100vh' }}></div>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
