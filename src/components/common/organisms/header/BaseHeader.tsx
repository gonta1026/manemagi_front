import React, { useEffect, useState } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { BaseIcon, BaseLink } from '../../uiParts/atoms';
import { Menu, MenuItem } from '@material-ui/core';
/* const */
import { COLORS } from '../../../../const/color';
/* pageMap */
import { page } from '../../../../pageMap';
/* pageMap */
import { ommisionText } from '../../../../utils/function';
import useIsAfterSsr from '../../../../customHook/useIsAfterSsr';
/* types */
import { settingAndUser } from '../../../../types/Setting';
/* styles */
import { materialStyles } from '../../../../styles/js/material';
import LocalStorage from '../../../../utils/LocalStorage';

const BaseHeader = ({
  className = '',
  toggleDrawer,
  settingState,
}: {
  className?: string;
  toggleDrawer: any;
  settingState: settingAndUser;
}) => {
  const classes = materialStyles({
    headerTitle: {
      color: COLORS.TEXT_GREEN,
    },
  });

  const localStorage = new LocalStorage();
  const router = useRouter();
  const isAfterSsr = useIsAfterSsr();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [headPathName, setHeadPathName] = useState<string>('/');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  // TODO ログアウトは Authクラス等を作成して管理する。localStorageのkeyもClientStorageクラス等を作成して管理させる。
  const logOut = (router: NextRouter) => {
    localStorage.removeLoginedStorage();
    setAnchorEl(null);
    router.push(page.login.link());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const pathName = settingState.user?.id ? page.top.link() : page.home.link();
    if (pathName) {
      setHeadPathName(pathName);
    }
  }, [settingState]);

  return (
    <AppBar position="static" className={className + ' sticky z-10 top-0'} color={'inherit'}>
      <Toolbar>
        <div className="flex items-center justify-between w-full">
          <div className="left flex items-center">
            {/* このaccessTokenがあるかという処理は変更予定。セッションが切れた時にトークンだけ残り続けてしまうのでそのタイミングで破棄をする必要がある。*/}
            {isAfterSsr && localStorage.loginedStorageExists() && (
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
              <Typography variant="h6" className={classes.headerTitle}>
                TATEKAE
              </Typography>
            </BaseLink>
          </div>
          {/* このaccessTokenがあるかという処理は変更予定。セッションが切れた時にトークンだけ残り続けてしまうのでそのタイミングで破棄をする必要がある。*/}
          {isAfterSsr && localStorage.loginedStorageExists() && (
            <div className="flex items-center">
              {settingState.user?.name && (
                <div className="mr-2">{ommisionText(settingState.user?.name)}</div>
              )}
              <BaseIcon icon="accountCircle" onClick={handleClick} />
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
