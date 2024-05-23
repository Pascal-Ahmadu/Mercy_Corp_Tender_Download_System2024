import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from '../pages/Home';
import Tabpanel from '../pages/TendersTabs'
import { Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminAppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px',
          p: 0,
          width: {
            xs: '100vw',  // Full width on extra-small screens
            sm: '100vw',  // Full width on small screens
            md: '90vw',   // 90% width on medium screens
            lg: '100vw',   // 80% width on large screens
            xl: '100vw'    // 70% width on extra-large screens
          }
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TenderTabs" element={<Tabpanel />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
