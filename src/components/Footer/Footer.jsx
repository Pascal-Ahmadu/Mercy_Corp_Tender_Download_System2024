// src/components/Footer/Footer.jsx
import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5', // grey background
  padding: theme.spacing(2),
  position: 'fixed',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: '#000000', // black text
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Developed and maintained by MercyCorp Software Development and ICT Unit 2024
      </FooterText>
      <div>
        <Link href="/privacy" color="inherit" underline="hover">Privacy</Link> | <Link href="/documentation" color="inherit" underline="hover">Documentation</Link>
      </div>
    </FooterContainer>
  );
};

export default Footer;
