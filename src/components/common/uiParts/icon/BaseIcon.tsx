import React, { ReactNode } from 'react';
import { AccountCircle, Settings, ShoppingCart, Store, Money } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';

export type TIcon = 'settings' | 'shoppingCart' | 'store' | 'money' | 'accountCircle';

const BaseIcon = ({
  className,
  icon,
  onClick,
}: {
  className?: string;
  icon: TIcon;
  onClick?: any;
}): JSX.Element => {
  const switchIcon = (icon: TIcon): ReactNode => {
    switch (icon) {
      case 'settings':
        return <Settings />;
      case 'shoppingCart':
        return <ShoppingCart />;
      case 'store':
        return <Store />;
      case 'money':
        return <Money />;
      case 'accountCircle':
        return <AccountCircle />;
      default:
        return;
    }
  };

  return (
    <ListItemIcon className={className} onClick={onClick}>
      {switchIcon(icon)}
    </ListItemIcon>
  );
};

export default BaseIcon;
