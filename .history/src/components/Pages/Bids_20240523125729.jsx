import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { supabase } from '../../supabaseClient';

const UploadBid = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Retrieve the custom auth token from localStorage or your custom auth provider
    const token = localStorage.getItem('authToken');

    if (token) {
      // Set the token for Supabase client
      supabase.auth.setAuth(token);
    }
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // Upload the file to the Supabase storage bucket
      const { data: fileData, error: fileError } = await supabase.storage
        .from('Bids') // Ensure the bucket name is 'bids'
        .upload(`files/${selectedFile.name}`, selectedFile);

      if (fileError) {
        console.error('Error uploading file:', fileError.message);
      } else {
        console.log('File uploaded successfully:', fileData);

        // Insert the file information into the 'bids' table
        const { data, error } = await supabase
          .from('bids')
          .insert([{ file_name: selectedFile.name, file_key: fileData.path }]); // Use 'path' for file_key

        if (error) {
          console.error('Error inserting file info into database:', error.message);
        } else {
          console.log('File info inserted into database:', data);
        }
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
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
      {selectedFile && (
        <Typography variant="body1" sx={{ margin: '16px 0' }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}
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
