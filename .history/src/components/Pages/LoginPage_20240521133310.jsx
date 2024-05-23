import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Link, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import profileImage from '../../assets/mercy.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Box
          sx={{
            mt: 1,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            sx={{
              height: { xs: 80, md: 90, lg: 100 },
              width: { xs: 80, md: 90, lg: 100 },
              borderRadius: '50%',
              marginBottom: 2,
            }}
            alt="Profile"
            src={profileImage}
          />
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome
          </Typography>
          <Box component="form" sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: '15px',
                height: '50px',
                maxWidth: '500px',
                width: '100%',
                alignSelf: 'center',
                backgroundColor: '#D0202E',
                '&:hover': {
                  backgroundColor: '#B01C26',
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography align="right">
              <Link href="#" variant="body2">
                Forgot Password?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;