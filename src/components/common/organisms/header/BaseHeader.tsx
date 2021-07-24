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
    router.push(page.login.link());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const headPathName = settingState.user.id ? page.top.link() : page.login.link();

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <div className="flex items-center justify-between w-full">
          <div className="left flex items-center">
            {/* idに0が来ない前提でこのような処理をしているがあまりよくないと思われる */}
            {settingState.user.id !== null && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <BaseLink pathname={headPathName}>
              <Typography variant="h6">Manemagi</Typography>
            </BaseLink>
          </div>
          {settingState.user.id !== null && (
            <div className="flex items-center">
              <div className="mr-2">{ommisionText(settingState.user.name)}</div>
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
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default BaseHeader;
