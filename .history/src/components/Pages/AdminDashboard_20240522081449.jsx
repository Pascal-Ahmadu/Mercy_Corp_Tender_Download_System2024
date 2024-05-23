// src/pages/AdminDashboard.jsx
import React from 'react';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home  from   '../pages/Home';
import { Container, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <div>
      <AdminAppBar />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
