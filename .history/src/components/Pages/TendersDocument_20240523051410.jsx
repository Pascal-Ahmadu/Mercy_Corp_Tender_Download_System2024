import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, IconButton, TextField, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from '../../supabaseClient';

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 3;

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredTenders = tenders.filter((tender) =>
    tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tender.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(indexOfFirstTender, indexOfLastTender);
  const pageCount = Math.ceil(filteredTenders.length / tendersPerPage);

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="flex-end" padding={2}>
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
      </Box>
      <Grid container spacing={3}>
        {currentTenders.map((tender) => (
          <Grid item xs={12} sm={6} md={4} key={tender.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
              <CardContent sx={{ minHeight: 200 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  Title: {tender.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Description: {tender.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Submission Deadline: {new Date(tender.submission_deadline).toLocaleDateString()}
                </Typography>
                <Box mt={2}>
                  <Box 
                    component="a" 
                    href={tender.document_url} 
                    download
                    sx={{ 
                      textDecoration: 'none' 
                    }}
                  >
                    <Box 
                      component="button" 
                      sx={{ 
                        backgroundColor: '#D0202E', 
                        color: 'white', 
                        borderRadius: '20px',
                        width: '150px', 
                        height: '50px', 
                        border: 'none', 
                        cursor: 'pointer',
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        ':hover': {
                          backgroundColor: '#B01728' 
                        }
                      }}
                    >
                      Download
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" padding={2}>
        <Pagination 
          count={pageCount} 
          page={currentPage} 
          onChange={handlePageChange} 
          variant="outlined" 
          shape="rounded" 
        />
      </Box>
    </Container>
  );
};

export default TenderList;
