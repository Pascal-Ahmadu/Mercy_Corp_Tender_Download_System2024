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
            xs: '100vw',  
            sm: '100vw',  
            md: '90vw',   
            lg: '100vw',   
            xl: '100vw'    
          }
        }}
      >
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/TenderTabs" element={<Tabpanel />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
