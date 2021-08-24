import React, { useState } from 'react';
import { useRouter } from 'next/router';
/* customHook */
import useIsAfterSsr from '../../../../customHook/useIsAfterSsr';
/* material-ui */
import { BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { Settings, ShoppingCart, Store, Money } from '@material-ui/icons';
/* modules */
import Auth from '../../../../modules/Auth';
/* pageMap */
import { page } from '../../../../pageMap/index';
/* styles */
import { materialStyles } from '../../../../styles/js/material';

const FooterNavigation = (): JSX.Element => {
  const classNames = {
    root: {
      backgroundColor: 'inherited',
      '&$selected': {
        color: '#13bd7b',
      },
    },
    selected: {},
  };
  const classes = materialStyles(classNames) as Record<keyof typeof classNames, string>;

  const navagationPage = {
    shop: {
      label: 'お店',
      num: 0,
    },
    shopping: {
      label: '買い物',
      num: 1,
    },
    claim: {
      label: '請求',
      num: 2,
    },
    setting: {
      label: '設定',
      num: 3,
    },
  } as const;

  const navigationProps = [
    {
      label: navagationPage.shop.label,
      icon: <Store />,
    },
    {
      label: navagationPage.shopping.label,
      icon: <ShoppingCart />,
    },
    {
      label: navagationPage.claim.label,
      icon: <Money />,
    },
    {
      label: navagationPage.setting.label,
      icon: <Settings />,
    },
  ];

  const auth = new Auth();
  const isAfterSsr = useIsAfterSsr();
  const router = useRouter();
  const [pageNum, setPageNum] = useState<() => 0 | 1 | 2 | 3 | undefined>(() => {
    switch (true) {
      case /shop/.test(router.pathname) && !/shopping/.test(router.pathname):
        return navagationPage.shop.num;
        break;
      case /shopping/.test(router.pathname):
        return navagationPage.shopping.num;
        break;
      case /claim/.test(router.pathname):
        return navagationPage.claim.num;
        break;
      case /setting/.test(router.pathname):
        return navagationPage.setting.num;
        break;
    }
  });

  return (
    <>
      {isAfterSsr && auth.loginedStorageExists() ? (
        <BottomNavigation
          className="container fixed z-10 bottom-0 left-0 sm:hidden"
          value={pageNum}
          onChange={(_, newPageNum) => {
            setPageNum(newPageNum);
            switch (newPageNum) {
              case navagationPage.shop.num:
                router.push(page.shop.list.link());
                break;
              case navagationPage.shopping.num:
                router.push(page.shopping.list.link());
                break;
              case navagationPage.claim.num:
                router.push(page.claim.list.link());
                break;
              case navagationPage.setting.num:
                router.push(page.setting.edit.link());
                break;
            }
          }}
          showLabels
        >
          {navigationProps.map((navigation, index) => (
            <BottomNavigationAction
              key={index}
              classes={classes}
              label={navigation.label}
              icon={navigation.icon}
            />
          ))}
        </BottomNavigation>
      ) : (
        <></>
      )}
    </>
  );
};

export default FooterNavigation;
