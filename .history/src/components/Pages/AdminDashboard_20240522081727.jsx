// src/pages/AdminDashboard.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from './Home';

import { Container, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div>
      <AdminAppBar />
      <Container style={{ marginTop: '64px', padding: '16px' }}> {/* Adjusted to avoid content overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
