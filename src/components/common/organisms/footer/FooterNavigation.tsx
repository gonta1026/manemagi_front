import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { Settings, ShoppingCart, Store, Money } from '@material-ui/icons';
/* pageMap */
import { page } from '../../../../pageMap/index';

const FooterNavigation = () => {
  const router = useRouter();
  const [pageNum, setPageNum] = React.useState(0);

  useEffect(() => {
    if (~router.pathname.indexOf(page.shopping.list.link())) {
      setPageNum(1);
    } else if (~router.pathname.indexOf(page.claim.list.link())) {
      setPageNum(2);
    } else if (~router.pathname.indexOf(page.setting.edit.link())) {
      setPageNum(3);
    }
  }, []);

  return (
    <BottomNavigation
      className="container fixed z-10 bottom-0 left-0 sm:hidden"
      value={pageNum}
      onChange={(_, newPageNum) => {
        setPageNum(newPageNum);
        switch (newPageNum) {
          case 0:
            router.push(page.shop.list.link());
            break;
          case 1:
            router.push(page.shopping.list.link());
            break;
          case 2:
            router.push(page.claim.list.link());
            break;
          case 3:
            router.push(page.setting.edit.link());
            break;
        }
      }}
      showLabels
    >
      <BottomNavigationAction label="お店" icon={<Store />} />
      <BottomNavigationAction label="買い物" icon={<ShoppingCart />} />
      <BottomNavigationAction label="請求" icon={<Money />} />
      <BottomNavigationAction label="設定" icon={<Settings />} />
    </BottomNavigation>
  );
};

export default FooterNavigation;
