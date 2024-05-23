import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { supabase } from '../../supabaseClient'; 
import bcrypt from 'bcryptjs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ErrorIcon from '@mui/icons-material/Error';
import mercyImage from '../../assets/mercy.png';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  organisation: yup.string().required('Organisation is required'),
});

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      organisation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');

      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(values.password, 10);

        // Send the form data to your backend for registration
        const { data, error } = await supabase.from('users').insert([
          { 
            name: values.name,
            email: values.email,
            password: hashedPassword,
            organisation: values.organisation,
          },
        ]);

        if (error) {
          throw error;
        }

        console.log('User registered successfully:', data);
        setSuccess(true);

        // Reset the form fields after successful registration
        formik.resetForm();
      } catch (error) {
        console.error('Error registering user:', error.message);
        setError(error.message);
        setFailure(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleCloseFailure = () => {
    setFailure(false);
  };

  return (
    <Container maxWidth="lg"> {/* Changed to lg for more space */}
      <Box
        mt={5}
        p={3}
        boxShadow={3}
        bgcolor="background.paper"
        borderRadius={2}
        sx={{
          ml: { xs: 'auto', sm: 'auto', md: isLaptop ? 30 : isTablet ? 50 : 40, lg: 70 },
          width: { xs: '100%', sm: '75%', md: isLaptop ? '50%' : isTablet ? '70%' : '80%', lg: '50%' },
        }}
      >
        <Typography variant="h5" gutterBottom>
          <Box display="flex" alignItems="center">
            <img 
              src={mercyImage} 
              alt="Registration" 
              style={{ 
                width: '150px', // Adjust the width as needed
                height: 'auto', // Maintain aspect ratio
                marginRight: '8px' 
              }} 
            />
            <Typography variant="h5" fontWeight="bold" color="#D0202E">
              Registration
            </Typography>
          </Box>
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ borderRadius: '15px', fontSize: '0.8rem' }} // Adjust font size
            InputProps={{
              style: {
                borderRadius: '15px',
                padding: '8px', // Adjust padding
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ borderRadius: '15px', fontSize: '0.8rem' }} // Adjust font size
            InputProps={{
              style: {
                borderRadius: '15px',
                padding: '8px', // Adjust padding
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ borderRadius: '15px', fontSize: '0.8rem' }} // Adjust font size
            InputProps={{
              style: {
                borderRadius: '15px',
                padding: '8px', // Adjust padding
              },
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            sx={{ borderRadius: '15px', fontSize: '0.8rem' }} // Adjust font size
            InputProps={{
              style: {
                borderRadius: '15px',
                padding: '8px', // Adjust padding
              },
            }}
          />
          <TextField
            label="Organisation"
            name="organisation"
            value={formik.values.organisation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={formik.touched.organisation && Boolean(formik.errors.organisation)}
            helperText={formik.touched.organisation && formik.errors.organisation}
            sx={{ borderRadius: '15px', fontSize: '0.8rem' }} // Adjust font size
            InputProps={{
              style: {
                borderRadius: '15px',
                padding: '8px', // Adjust padding
              },
            }}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                backgroundColor: '#D0202E',
                '&:hover': {
                  backgroundColor: '#B01C26',
                },
                borderRadius: '15px',
                height: '50px',
                width: '100%',
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Box>
        </form>
      </Box>

      {/* Success Dialog */}
      <Dialog open={success} onClose={handleCloseSuccess}>
        <DialogTitle style={{ borderRadius: '15px' }}>
          <Box display="flex" alignItems="center">
            <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
            Registration Successful
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>User registered successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Failure Dialog */}
      <Dialog open={failure} onClose={handleCloseFailure}>
        <DialogTitle style={{ borderRadius: '15px' }}>
          <Box display="flex" alignItems="center">
            <ErrorIcon sx={{ color: 'error.main', mr: 1 }} />
            Registration Failed
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>Error: {error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFailure} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RegistrationForm;
