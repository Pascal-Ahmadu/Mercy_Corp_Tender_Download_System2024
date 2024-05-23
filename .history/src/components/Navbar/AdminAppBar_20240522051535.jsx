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
import CloseIcon from '@mui/icons-material/Close';
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
  [`& .${classes.listItemIcon}`]: {
    minWidth: 'unset',
    color: '#D0202E',
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
        sx={{ '& .MuiDrawer-paper': { width: 300 } }} // Set the drawer width
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
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}><Home /></ListItemIcon>
              <ListItemText primary="Home" sx={{ color: '#D0202E' }} /> {/* Set the text color */}
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}><Assignment /></ListItemIcon>
              <ListItemText primary="Tenders" sx={{ color: '#D0202E' }} /> {/* Set the text color */}
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}><MoreVert /></ListItemIcon>
              <ListItemText primary="Other" sx={{ color: '#D0202E' }} /> {/* Set the text color */}
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Root>
  );
};

export default AdminAppBar;
