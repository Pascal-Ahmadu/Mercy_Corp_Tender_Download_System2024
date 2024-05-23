import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from '../pages/Home';

import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box>
      <AdminAppBar />
      <Box component="main" sx={{ mt: '64px', p: 0 }}> {/* Adjust the top margin to the height of the AppBar */}
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
