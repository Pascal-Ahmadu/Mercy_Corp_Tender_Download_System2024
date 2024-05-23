// src/components/pages/AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from '../pages/Home';
import Tabpanel from '../pages/TendersTabs';
import LoginPage from '../pages/LoginPage';
import { Box } from '@mui/material';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
      <AdminAppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px',
          p: 0,
          width: {
            xs: '100vw',
            sm: '100vw',
            md: '90vw',
            lg: '100vw',
            xl: '100vw',
          },
        }}
      >
        <Routes>
          <Route path="/home" element={<PrivateRoute element={<Home user={user ? user.name : null} />} />} />
          <Route path="/tendertabs" element={<PrivateRoute element={<Tabpanel />} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
