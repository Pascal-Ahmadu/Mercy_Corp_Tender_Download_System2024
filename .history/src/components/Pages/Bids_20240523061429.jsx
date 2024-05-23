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
      
      const { data: fileData, error: fileError } = await supabase.storage
        .from('bids')
        .upload(`files/${selectedFile.name}`, selectedFile);
  
      if (fileError) {
        console.error('Error uploading file:', fileError.message);
      } else {
        console.log('File uploaded successfully:', fileData.Key);
  
        // Insert the file information into the 'bids' table
        const { data, error } = await supabase
          .from('bids')
          .insert([{ file_name: selectedFile.name, file_key: fileData.Key }]);
  
        if (error) {
          console.error('Error inserting file info into database:', error.message);
        } else {
          console.log('File info inserted into database:', data);
          // You can perform any additional logic here after successful insertion
        }
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