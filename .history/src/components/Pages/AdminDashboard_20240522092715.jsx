import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from '../pages/Home';

import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminAppBar />
      <Box component="main" sx={{ flexGrow: 1, mt: '64px', p: 0, width: '1000vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
