import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Link, Typography, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import profileImage from '../../assets/mercy.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        setFieldError('general', error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (user) {
      navigate(`/admin/home?user=${encodeURIComponent(user.name)}`);
    }
  }, [user, navigate]);

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
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
            />
            {formik.errors.general && <Typography color="error" variant="body2">{formik.errors.general}</Typography>}
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
                type="submit"
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
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <CircularProgress size={24} /> : 'Login'}
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
