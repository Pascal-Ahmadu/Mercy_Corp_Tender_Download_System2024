// src/pages/AdminDashboard.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from './Home';

import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div>
      <AdminAppBar />
      <Box sx={{ marginTop: '64px', padding: '16px' }}> 
        <Routes>
          <Route path="/" element={<Home />} />
         
        </Routes>
      </Box>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
