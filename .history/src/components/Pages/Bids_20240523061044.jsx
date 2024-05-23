import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { supabase } from '../supabaseClient'; 

const UploadBid = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const { data, error } = await supabase.storage.from('your-bucket-name').upload(`files/${selectedFile.name}`, selectedFile);
      if (error) {
        console.error('Error uploading file:', error.message);
      } else {
        console.log('File uploaded successfully:', data.Key);
        // You can perform any additional logic here, such as updating the database with the file information
      }
    }
  };

  return (
    <Box>
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
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile}
        sx={{ marginTop: 1 }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default UploadBid;