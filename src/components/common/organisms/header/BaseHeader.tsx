import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { BaseIcon } from '../../uiParts/atoms';
import { Menu, MenuItem } from '@material-ui/core';

const BaseHeader = ({
  className = '',
  toggleDrawer,
}: {
  className?: string;
  toggleDrawer: any;
}) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const logOut = (router: NextRouter) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    setAnchorEl(null);
    router.push('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <div className="flex items-center justify-between w-full">
          <div className="left flex items-center">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Manemagi</Typography>
          </div>
          <BaseIcon className={'text-white'} icon="accountCircle" onClick={handleClick} />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => logOut(router)}>ログアウト</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BaseHeader;
