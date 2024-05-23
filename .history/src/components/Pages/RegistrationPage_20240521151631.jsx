import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { supabase } from '../../supabaseClient'; // Import Supabase client instance
import bcrypt from 'bcryptjs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import mercyImage from '../../assets/mercy.png';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organisation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Send the form data to your backend for registration
      const { data, error } = await supabase.from('users').insert([
        { 
          name: formData.name,
          email: formData.email,
          password: hashedPassword,
          organisation: formData.organisation,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('User registered successfully:', data);
      setSuccess(true);

      // Reset the form fields after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        organisation: '',
      });
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError(error.message);
      setFailure(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleCloseFailure = () => {
    setFailure(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} bgcolor="background.paper" borderRadius={2}>
      
      <Typography variant="h5" gutterBottom>
  <Box display="flex" alignItems="center">
    <img 
      src={mercyImage} 
      alt="Registration" 
      style={{ 
        width: '80px', // Adjust the width as needed
        height: 'auto', // Maintain aspect ratio
        marginRight: '8px' 
      }} 
    />
    Registration
  </Box>
</Typography>


        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            sx={{ borderRadius: '15px' }}
            InputProps={{
              style: {
                borderRadius: '15px',
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            sx={{ borderRadius: '15px' }}
            InputProps={{
              style: {
                borderRadius: '15px',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            sx={{ borderRadius: '15px' }}
            InputProps={{
              style: {
                borderRadius: '15px',
              },
            }}
          />
          <TextField
            label="Organisation"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ borderRadius: '15px' }}
            InputProps={{
              style: {
                borderRadius: '15px',
              },
            }}
          />
          <Box mt={2} display="flex" justifyContent="center">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{ 
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
