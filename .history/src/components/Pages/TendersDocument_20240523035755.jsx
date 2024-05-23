import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { supabase } from '../../supabaseClient';

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const filteredTenders = tenders.filter((tender) =>
    tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tender.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", flexDirection: "column", padding: 20 }}>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            id="search-bar"
            className="text"
            onInput={handleSearchChange}
            label="Enter Tender name"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchQuery}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </form>
      </div>
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
                  <Button 
                    variant="contained" 
                    sx={{ 
                      backgroundColor: '#D0202E', 
                      borderRadius: '20px',
                      width: '150px', // Adjust width here
                      height: '50px', // Adjust height here
                      ':hover': {
                        backgroundColor: '#B01728' // Slightly darker color on hover
                      }
                    }} 
                    href={tender.document_url} 
                    download
                  >
                    Download
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
