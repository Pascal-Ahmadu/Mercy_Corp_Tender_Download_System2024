import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { supabase } from '../../supabaseClient'; // Import Supabase client instance

const Home = () => {
  const [user, setUser] = useState(null);
  const [tenderStats, setTenderStats] = useState({
    availableTenders: 0,
    openedTenders: 0,
    availableBids: 0,
  });

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };

    const fetchTenderStats = async () => {
      const { count: availableTendersCount } = await supabase
        .from('tenders')
        .select('*', { count: 'exact' })
        .eq('status', 'available');

      const { count: openedTendersCount } = await supabase
        .from('tenders')
        .select('*', { count: 'exact' })
        .eq('status', 'opened');

      const { count: availableBidsCount } = await supabase
        .from('bids')
        .select('*', { count: 'exact' });

      setTenderStats({
        availableTenders: availableTendersCount,
        openedTenders: openedTendersCount,
        availableBids: availableBidsCount,
      });
    };

    fetchUser();
    fetchTenderStats();
  }, []);

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}>
      <Box mt={5} mb={3}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user ? user.email : 'Guest'}
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
