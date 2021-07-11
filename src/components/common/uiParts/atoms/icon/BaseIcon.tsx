import React, { ReactNode } from 'react';
import { Settings, ShoppingCart, Money } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';

export type TIcon = 'settings' | 'shoppingCart' | 'money';

const BaseIcon = ({ icon }: { icon: TIcon }) => {
  const switchIcon = (icon: TIcon): ReactNode => {
    switch (icon) {
      case 'shoppingCart':
        return <ShoppingCart />;
      case 'money':
        return <Money />;
      case 'settings':
        return <Settings />;
      default:
        return;
    }
  };

  return <ListItemIcon>{switchIcon(icon)}</ListItemIcon>;
};

export default BaseIcon;
