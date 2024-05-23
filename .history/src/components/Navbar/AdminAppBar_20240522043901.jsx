import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { VscHome as Home, VscFileSubmodule as Assignment, VscEllipsis as MoreVert } from 'react-icons/vsc';
import logo from '../../assets/mercy.png';

const PREFIX = 'AdminAppBar';
const classes = {
  appBar: `${PREFIX}-appBar`,
  logo: `${PREFIX}-logo`,
  title: `${PREFIX}-title`,
  button: `${PREFIX}-button`,
  menuButton: `${PREFIX}-menuButton`,
  navButtons: `${PREFIX}-navButtons`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.appBar}`]: {
    backgroundColor: '#ffffff',
  },
  [`& .${classes.logo}`]: {
    marginRight: theme.spacing(10),
    height: '100px',
  },
  [`& .${classes.title}`]: {
    flexGrow: 1,
  },
  [`& .${classes.button}`]: {
    color: '#000000',
  },
  [`& .${classes.menuButton}`]: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  [`& .${classes.navButtons}`]: {
    display: 'flex',
    gap: theme.spacing(30), // Adds spacing between buttons
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  [`& .${classes.drawer}`]: {
    width: 250,
  },
  [`& .${classes.drawerPaper}`]: {
    width: 250,
  },
}));

const AdminAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Root>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src={logo} alt="Logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            Tender System Admin
          </Typography>
          <div className={classes.navButtons}>
            <Button className={classes.button} startIcon={<Home />} sx={{ color: '#D0202E' }} >Home</Button>
            <Button className={classes.button} startIcon={<Assignment />} sx={{ color: '#D0202E' }} >Tenders</Button>
            <Button className={classes.button} startIcon={<MoreVert />} sx={{ color: '#D0202E' }} >Other</Button>
          </div>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        classes={{ paper: classes.drawerPaper }}
      >
        <div
          className={classes.drawer}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <ListItem button>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Assignment /></ListItemIcon>
              <ListItemText primary="Tenders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><MoreVert /></ListItemIcon>
              <ListItemText primary="Other" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Root>
  );
};

export default AdminAppBar;
