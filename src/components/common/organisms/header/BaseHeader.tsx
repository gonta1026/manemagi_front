import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const BaseHeader = ({
  className = '',
  toggleDrawer,
}: {
  className?: string;
  toggleDrawer: any;
}) => {
  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Manemagi</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default BaseHeader;
