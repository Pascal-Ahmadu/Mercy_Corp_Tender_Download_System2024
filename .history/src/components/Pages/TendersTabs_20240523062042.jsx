const TabsPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="simple tabs example" 
        centered 
        sx={{
          '& .MuiTab-root': { color: '#D0202E !important' },
          '& .MuiTabs-indicator': { backgroundColor: '#B01728 !important' }, 
        }}
      >
        <Tab label="Available Tenders" />
        <Tab label="Submit Bids" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <TenderList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Your Submit Bids content goes here */}
        <Typography variant="h2">Submit Bids</Typography>
        <Box sx={{ p: 1 }}>
          {/* Your form for submitting bids */}
          <Typography>Form for submitting bids goes here...</Typography>
        </Box>
      </TabPanel>
    </Box>
  );
};
