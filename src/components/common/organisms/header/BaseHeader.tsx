import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { BaseIcon, BaseLink } from '../../uiParts/atoms';
import { Menu, MenuItem } from '@material-ui/core';
/* pageMap */
import { page } from '../../../../pageMap';
/* pageMap */
import { ommisionText } from '../../../../utils/function';
/* types */
import { settingAndUser } from '../../../../types/Setting';

const BaseHeader = ({
  className = '',
  toggleDrawer,
  settingState,
}: {
  className?: string;
  toggleDrawer: any;
  settingState: settingAndUser;
}) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  // TODO ログアウトは Authクラス等を作成して管理する。localStorageのkeyもClientStorageクラス等を作成して管理させる。
  const logOut = (router: NextRouter) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    setAnchorEl(null);
    router.push('/login');
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
            <BaseLink pathname={page.top.link()}>
              <Typography variant="h6">Manemagi</Typography>
            </BaseLink>
          </div>
          <div className="flex items-center">
            {ommisionText(settingState.user.name)}
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BaseHeader;
