import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from '../pages/Home';
import Tabpanel from '../pages/TendersTabs';
import { Box } from '@mui/material';
import { AuthProvider, useAuth } from '../contexts/AuthContext'; 

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth(); // Assuming useAuth provides user context and isAuthenticated state

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
            xl: '100vw'
          }
        }}
      >
        <Routes>
          <Route path="/Home" element={<Home user={user ? user.name : null} />} />
          <Route path="/TenderTabs" element={<Tabpanel />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

const AuthenticatedApp = () => (
  <AuthProvider>
    <Routes>
      <Route element={<AdminDashboard />} />
    </Routes>
  </AuthProvider>
);

export default AuthenticatedApp;
