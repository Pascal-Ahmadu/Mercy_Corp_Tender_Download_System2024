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
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    const fetchTenderStats = async () => {
      const availableTenders = await supabase.from('tenders').select('*').eq('status', 'available').count();
      const openedTenders = await supabase.from('tenders').select('*').eq('status', 'opened').count();
      const availableBids = await supabase.from('bids').select('*').count();

      setTenderStats({
        availableTenders: availableTenders.count,
        openedTenders: openedTenders.count,
        availableBids: availableBids.count,
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
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%' }}>
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
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%' }}>
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
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%' }}>
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
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, width: '100%' }}>
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
