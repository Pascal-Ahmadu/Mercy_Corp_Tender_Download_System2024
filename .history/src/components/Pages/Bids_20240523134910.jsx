import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Backdrop, Modal, CircularProgress, Card, CardContent } from '@mui/material';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const UploadBid = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [userBids, setUserBids] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserBids = async () => {
      const { data, error } = await supabase
        .from('bids')
        .select('file_name, uploaded_by')
        .eq('uploaded_by', user?.email);

      if (error) {
        console.error('Error fetching user bids:', error.message);
      } else {
        setUserBids(data);
      }
    };

    fetchUserBids();
  }, [user?.email, uploadCompleted]);

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
          setSelectedFile(null);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleDelete = async (fileName) => {
    setLoading(true);
    const { error } = await supabase
      .from('bids')
      .delete()
      .eq('file_name', fileName)
      .eq('uploaded_by', user.email);

    if (error) {
      console.error('Error deleting bid:', error.message);
    } else {
      setUserBids((prevBids) => prevBids.filter((bid) => bid.file_name !== fileName));
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
          sx={{ bgcolor: '#D0202E', color: 'white', mb: 2 }}
        >
          Choose File
        </Button>
      </label>
      <Typography variant="body1" sx={{ margin: '0 8px', mb: 2 }}>
        {selectedFile && `Selected File: ${selectedFile.name}`}
      </Typography>
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile}
        sx={{ bgcolor: '#D0202E', color: 'white', mb: 2 }}
      >
        Upload
      </Button>
      {userBids.map((bid) => (
        <Card key={bid.file_name} sx={{ width: 300, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Your Uploaded Bid
            </Typography>
            <Typography variant="body1">
              File Name: {bid.file_name}
            </Typography>
            <Typography variant="body2">
              Uploaded By: {bid.uploaded_by}
            </Typography>
            <Button variant="contained" onClick={() => handleDelete(bid.file_name)} sx={{ mt: 2 }}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
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
