import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { supabase } from '../path/to/supabaseClient'; // Import Supabase client instance
import bcrypt from 'bcryptjs';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organisation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.error('Error registering user:', error.message);
      return;
    }

    console.log('User registered successfully:', data);

    // Reset the form fields after successful registration
    setFormData({
      name: '',
      email: '',
      password: '',
      organisation: '',
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} bgcolor="background.paper" borderRadius={2}>
        <Typography variant="h5" gutterBottom>
          Registration
        </Typography>
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
          />
          <TextField
            label="Organisation"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
