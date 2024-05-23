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
  listItemIcon: `${PREFIX}-listItemIcon`,
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
    gap: theme.spacing(2), // Adds spacing between buttons
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  [`& .${classes.drawer}`]: {
    width: 350, // Increased drawer width
  },
  [`& .${classes.drawerPaper}`]: {
    width: 350, // Increased drawer width
  },
  [`& .${classes.listItemIcon}`]: {
    minWidth: 'unset',
    color: '#D0202E', // Set icon color in the hamburger menu
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
            <Button className={classes.button} startIcon={<Home />}>
              Home
            </Button>
            <Button className={classes.button} startIcon={<Assignment />}>
              Tenders
            </Button>
            <Button className={classes.button} startIcon={<MoreVert />}>
              Other
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
              <ListItemIcon className={classes.listItemIcon}><Home /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}><Assignment /></ListItemIcon>
              <ListItemText primary="Tenders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}><MoreVert /></ListItemIcon>
              <ListItemText primary="Other" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Root>
  );
};

export default AdminAppBar;