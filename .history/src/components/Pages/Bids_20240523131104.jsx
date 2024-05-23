// src/components/pages/UploadBid.jsx
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const UploadBid = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile && user) {
      // Upload the file to Supabase storage
      const { data: fileData, error: fileError } = await supabase.storage
        .from('Bids')
        .upload(`files/${selectedFile.name}`, selectedFile);

      if (fileError) {
        console.error('Error uploading file:', fileError.message);
        return;
      }

      console.log('File uploaded successfully:', fileData.Key);

      // Fetch the user's details (name and organisation) from the 'users' table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name, organisation')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error fetching user details:', userError.message);
        return;
      }

      // Insert the file information into the 'bids' table
      const { data, error } = await supabase
        .from('bids')
        .insert([{
          file_name: selectedFile.name,
          file_key: fileData.Key,
          uploaded_by: userData.name,
          organisation: userData.organisation
        }]);

      if (error) {
        console.error('Error inserting file info into database:', error.message);
      } else {
        console.log('File info inserted into database:', data);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input">
        <Button component="span" variant="contained">
          Choose File
        </Button>
      </label>
      <Typography variant="body1" sx={{ margin: '0 8px' }}>
        {selectedFile && `Selected File: ${selectedFile.name}`}
      </Typography>
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadBid;
