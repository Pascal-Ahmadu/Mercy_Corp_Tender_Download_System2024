import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { supabase } from '../../supabaseClient';

const Home = () => {
  const [user, setUser] = useState(null);
  const [tenderStats, setTenderStats] = useState({
    availableTenders: 0,
    closedTenders: 0,
    availableBids: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        navigate('/login');
      } else {
        setUser(storedUser);
      }
    };

    const fetchTenderStats = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        console.log('Today:', today); // Log the date to verify format

        const { data: availableTenders, error: availableError, count: availableTendersCount } = await supabase
          .from('tenders')
          .select('id', { count: 'exact' })
          .gte('submission_deadline', today);
        if (availableError) throw availableError;
        console.log('Available Tenders:', availableTenders, availableTendersCount);

        const { data: closedTenders, error: closedError, count: closedTendersCount } = await supabase
          .from('tenders')
          .select('id', { count: 'exact' })
          .lt('submission_deadline', today); // Check for submission_deadline earlier than today
        if (closedError) throw closedError;
        console.log('Closed Tenders:', closedTenders, closedTendersCount);

        const { count: availableBidsCount, error: bidsError } = await supabase
          .from('bids')
          .select('id', { count: 'exact' });
        if (bidsError) throw bidsError;
        console.log('Available Bids Count:', availableBidsCount);

        setTenderStats({
          availableTenders: availableTendersCount ?? 0,
          closedTenders: closedTendersCount ?? 0,
          availableBids: availableBidsCount > 0 ? availableBidsCount : 0, // Check if the count is greater than 0 before assigning
        });
        console.log('Tender Stats:', {
          availableTenders: availableTendersCount ?? 0,
          closedTenders: closedTendersCount ?? 0,
          availableBids: availableBidsCount ?? 0,
        });
      } catch (error) {
        console.error('Error fetching tender stats:', error);
      }
    };

    fetchUser();
    fetchTenderStats();
  }, [navigate]);

  if (!user) {
    return null; 
  }

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}>
      <Box mt={5} mb={3}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Tenders
              </Typography>
              <Typography variant="h4">
                {tenderStats.availableTenders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Closed Tenders
              </Typography>
              <Typography variant="h4">
                {tenderStats.closedTenders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Bids
              </Typography>
              <Typography variant="h4">
                {tenderStats.availableBids}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
