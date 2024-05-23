import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#ffffff', // white background
    padding: theme.spacing(2),
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
  },
  footerText: {
    color: '#000000', // black text
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <p className={classes.footerText}>
        Developed and maintained by Mercy Corp Software Development and ICT Unit 2024
      </p>
    </div>
  );
};

export default Footer;
