import React, { useState } from 'react';
import { Box, Button, Typography, Backdrop, Modal, CircularProgress } from '@mui/material';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const UploadBid = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile && user) {
      setLoading(true);
      // Parse the file before uploading
      const reader = new FileReader();
      reader.onload = async () => {
        const fileContent = reader.result;

        // Upload the file to Supabase storage
        const { data: fileData, error: fileError } = await supabase.storage
          .from('Bids')
          .upload(`files/${selectedFile.name}`, fileContent);

        if (fileError) {
          console.error('Error uploading file:', fileError.message);
          setLoading(false);
          return;
        }

        console.log('File uploaded successfully:', fileData.path);

        // Fetch the user's details (name and organisation) from the 'users' table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('name, organisation')
          .eq('id', user.id)
          .single();

        if (userError) {
          console.error('Error fetching user details:', userError.message);
          setLoading(false);
          return;
        }

        // Insert the file information into the 'bids' table
        const { data, error } = await supabase
          .from('bids')
          .insert([{
            file_name: selectedFile.name,
            file_key: fileData.path,
            uploaded_by: userData.name,
            organisation: userData.organisation
          }]);

        if (error) {
          console.error('Error inserting file info into database:', error.message);
          setLoading(false);
        } else {
          console.log('File info inserted into database:', data);
          setUploadCompleted(true);
          setLoading(false);
          setTimeout(() => {
            setUploadCompleted(false);
            window.location.reload();
          }, 3000); // Reset uploadCompleted and refresh page after 3 seconds
        }
      };

      reader.readAsArrayBuffer(selectedFile);
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
        <Button
          component="span"
          variant="contained"
          sx={{ bgcolor: '#D0202E', color: 'white' }}
        >
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
        sx={{ bgcolor: '#D0202E', color: 'white' }}
      >
        Upload
      </Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={uploadCompleted}
        onClose={() => setUploadCompleted(false)}
        aria-labelledby="upload-completed-modal"
        aria-describedby="upload-completed-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" component="h2">
            Upload Completed
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadBid;
