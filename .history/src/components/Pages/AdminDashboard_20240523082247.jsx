import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminAppBar from '../Navbar/AdminAppBar';
import Footer from '../Footer/Footer';
import Home from '../pages/Home';
import Tabpanel from '../pages/TendersTabs';
import { Box } from '@mui/material';
import { AuthProvider } from '../contexts/AuthContext'; 

const AdminDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          throw new Error('User data not found in local storage');
        }

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthProvider> 
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
            <Route path="/Home" element={<Home user={email} />} />
            <Route path="/TenderTabs" element={<Tabpanel />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </AuthProvider>
  );
};

export default AdminDashboard;
