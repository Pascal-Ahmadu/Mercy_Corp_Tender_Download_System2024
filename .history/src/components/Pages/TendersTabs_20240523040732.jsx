import React, { useState } from 'react';
import { Tab, Tabs, Typography, Box } from '@mui/material';
import TenderList from './TendersDocument';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TabsPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Available Tenders " />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TenderList />
      </TabPanel>
      
    </div>
  );
};

export default TabsPanel;
