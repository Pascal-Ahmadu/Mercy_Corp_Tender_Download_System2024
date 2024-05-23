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
import { makeStyles } from '@mui/styles';
import { Home, Assignment, MoreVert } from 'react-icons/md';
import logo from '../../assets/mercy.png'; 

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#ffffff', 
  },
  logo: {
    marginRight: theme.spacing(2),
    height: '40px', 
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: '#000000', 
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  navButtons: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
  },
}));

const AdminAppBar = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src={logo} alt="Logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            Tender System Admin
          </Typography>
          <div className={classes.navButtons}>
            <Button className={classes.button} startIcon={<Home />}>Home</Button>
            <Button className={classes.button} startIcon={<Assignment />}>Tenders</Button>
            <Button className={classes.button} startIcon={<MoreVert />}>Other</Button>
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
    </div>
  );
};

export default AdminAppBar;
