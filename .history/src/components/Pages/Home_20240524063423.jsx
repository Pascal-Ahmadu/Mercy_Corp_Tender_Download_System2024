import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { supabase } from '../../supabaseClient';

const Home = () => {
  const [user, setUser] = useState(null);
  const [tenderStats, setTenderStats] = useState({
    availableTenders: 0,
    openedTenders: 0,
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

        const { data: availableTenders, error: availableError, count: availableTendersCount } = await supabase
          .from('tenders')
          .select('id', { count: 'exact' })
          .gt('submission_deadline', today);
        if (availableError) throw availableError;

        const { data: openedTenders, error: openedError, count: openedTendersCount } = await supabase
          .from('tenders')
          .select('id', { count: 'exact' })
          .eq('status', 'opened');
        if (openedError) throw openedError;

        const { data: availableBids, error: bidsError, count: availableBidsCount } = await supabase
          .from('bids')
          .select('id', { count: 'exact' });
        if (bidsError) throw bidsError;

        setTenderStats({
          availableTenders: availableTendersCount || 0,
          openedTenders: openedTendersCount || 0,
          availableBids: availableBidsCount || 0,
        });
      } catch (error) {
        console.error('Error fetching tender stats:', error);
      }
    };

    fetchUser();
    fetchTenderStats();
  }, [navigate]);

  if (!user) {
    return null; // Optionally, you can return a loading spinner or a placeholder here
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
                Opened Tenders
              </Typography>
              <Typography variant="h4">
                {tenderStats.openedTenders}
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
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tenders Available
              </Typography>
              <Typography variant="h4">
                {tenderStats.availableTenders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
