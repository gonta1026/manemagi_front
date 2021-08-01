import React from 'react';
import { useRouter } from 'next/router';
import { BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { Settings, ShoppingCart, Store, Money } from '@material-ui/icons';

const FooterNavi = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(() => {
    if (router.pathname.match(/shopping/)) {
      return 1;
    } else if (router.pathname.match(/claim/)) {
      return 2;
    } else if (router.pathname.match(/setting/)) {
      return 3;
    } else {
      return 0;
    }
  });

  return (
    <BottomNavigation
      className="container fixed z-10 bottom-0 left-0 sm:hidden"
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
        switch (newValue) {
          case 0:
            router.push('/shop');
            break;
          case 1:
            router.push('/shopping');
            break;
          case 2:
            router.push('/claim');
            break;
          case 3:
            router.push('/setting');
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

export default FooterNavi;
