import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { styled } from '@mui/system';
import { VscHome as Home, VscFileSubmodule as Assignment, VscSignOut as LogOut } from 'react-icons/vsc';
import logo from '../../assets/mercy.png';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const PREFIX = 'AdminAppBar';
const classes = {
  appBar: `${PREFIX}-appBar`,
  logo: `${PREFIX}-logo`,
  title: `${PREFIX}-title`,
  button: `${PREFIX}-button`,
  menuButton: `${PREFIX}-menuButton`,
  navButtons: `${PREFIX}-navButtons`,
  drawer: `${PREFIX}-drawer`,
  loader: `${PREFIX}-loader`,
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
    color: '#D0202E',
    fontWeight: 'bold',
  },
  [`& .${classes.menuButton}`]: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    color: '#D0202E',
  },
  [`& .${classes.navButtons}`]: {
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  [`& .${classes.loader}`]: {
    marginLeft: theme.spacing(2),
  },
}));

const AdminAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add state for loading
  const { logout } = useAuth(); // Get the logout function from useAuth

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when logout starts
    await logout();
    setLoading(false); // Set loading to false when logout is complete
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
            <Button component={Link} to="/admin/Home" className={classes.button} startIcon={<Home />}>
              Home
            </Button>
            <Button component={Link} to="/admin/TenderTabs" className={classes.button} startIcon={<Assignment />}>
              Tenders
            </Button>
            <Button onClick={handleLogout} className={classes.button} startIcon={<LogOut />}>
              Log Out
              {loading && <CircularProgress size={20} className={classes.loader} />} {/* Show loader when loading */}
            </Button>
          </div>
          <IconButton
            edge="end"
            className={classes.menuButton}
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
        sx={{ '& .MuiDrawer-paper': { width: 300 } }}
      >
        <div
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: '#D0202E', float: 'right', m: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem button component={Link} to="/admin/Home" sx={{ padding: '16px 24px' }}>
              <ListItemIcon sx={{ color: '#D0202E', fontSize: '2rem' }}><Home /></ListItemIcon>
              <ListItemText primary="Home" sx={{ color: '#D0202E', fontSize: '1.25rem' }} />
            </ListItem>
            <ListItem button component={Link} to="/admin/TenderTabs" sx={{ padding: '16px 24px' }}>
              <ListItemIcon sx={{ color: '#D0202E', fontSize: '2rem' }}><Assignment /></ListItemIcon>
              <ListItemText primary="Tenders" sx={{ color: '#D0202E', fontSize: '1.25rem' }} />
            </ListItem>
            <ListItem button onClick={handleLogout} sx={{ padding: '16px 24px' }}>
              <ListItemIcon sx={{ color: '#D0202E', fontSize: '2rem' }}><LogOut /></ListItemIcon>
              <ListItemText primary="Log Out" sx={{ color: '#D0202E', fontSize: '1.25rem' }} />
              {loading && <CircularProgress size={20} className={classes.loader} />} {/* Show loader when loading */}
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Root>
  );
};

export default AdminAppBar;
