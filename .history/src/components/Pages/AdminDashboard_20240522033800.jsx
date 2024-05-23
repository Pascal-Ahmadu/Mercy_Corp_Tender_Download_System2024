// src/pages/AdminDashboard.jsx
import React from 'react';
import AdminAppBar from '../components/AdminAppBar';
import Footer from '../components/Footer';
import { Container, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div>
      <AdminAppBar />
      <Container style={{ marginTop: '64px', marginBottom: '64px' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        
      </Container>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
