import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Link, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import profileImage from '../../assets/mercy.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth(); // Fetching user from the authentication context

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigate(`/admin-dashboard/home?user=${encodeURIComponent(user.name)}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            position: 'relative',
            right: { xs: 0, md: -200, lg: -550 }, 
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
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
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
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Box>
            <Typography align="right">
              Don't have an account? 
              <Link href="/register" variant="body2">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
