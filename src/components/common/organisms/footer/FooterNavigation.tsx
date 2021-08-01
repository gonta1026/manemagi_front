import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { Settings, ShoppingCart, Store, Money } from '@material-ui/icons';
/* pageMap */
import { page } from '../../../../pageMap/index';

const FooterNavigation = () => {
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
      <BottomNavigationAction label={navagationPage.shop.label} icon={<Store />} />
      <BottomNavigationAction label={navagationPage.shopping.label} icon={<ShoppingCart />} />
      <BottomNavigationAction label={navagationPage.claim.label} icon={<Money />} />
      <BottomNavigationAction label={navagationPage.setting.label} icon={<Settings />} />
    </BottomNavigation>
  );
};

export default FooterNavigation;
