import React, { ReactNode } from 'react';
import { AccountCircle, Settings, ShoppingCart, Money } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';

export type TIcon = 'settings' | 'shoppingCart' | 'money' | 'accountCircle';

const BaseIcon = ({
  className,
  icon,
  onClick,
}: {
  className?: string;
  icon: TIcon;
  onClick?: any;
}) => {
  const switchIcon = (icon: TIcon): ReactNode => {
    switch (icon) {
      case 'shoppingCart':
        return <ShoppingCart />;
      case 'money':
        return <Money />;
      case 'settings':
        return <Settings />;
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
