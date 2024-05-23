import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { positions } from '@mui/system';

import { supabase } from '../../supabaseClient'; 

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTenders = async () => {
      const { data, error } = await supabase.from('tenders').select('*');
      if (error) {
        console.error('Error fetching tenders:', error);
      } else {
        setTenders(data);
      }
    };

    fetchTenders();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTenders = tenders.filter((tender) =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Box mb={3}>
        <TextField
          label="Search Tender"
          variant="outlined"
          fullWidth
          flexDirection = "row-reverse"
          justifyContent= "flex-end"
        
          value={searchTerm}
          onChange={handleSearch}
          sx={{ marginBottom: 3 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredTenders.map((tender) => (
          <Grid item xs={12} sm={6} md={4} key={tender.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {tender.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {tender.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Submission Deadline: {new Date(tender.submission_deadline).toLocaleDateString()}
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="primary" href={tender.document_url} download>
                    Download Tender Document
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TenderList;
