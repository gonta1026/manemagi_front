import React, { ReactNode } from 'react';
import { AccountCircle, Money, PersonOutline, Settings, ShoppingCart } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';
export type TIcon = 'accountCircle' | 'money' | 'personOutline' | 'settings' | 'shoppingCart';

const BaseIcon = ({
  className = '',
  onClick,
  icon,
}: {
  className?: string;
  onClick: any;
  icon: TIcon;
}) => {
  const switchIcon = (icon: TIcon): ReactNode => {
    switch (icon) {
      case 'accountCircle':
        return <AccountCircle />;
      case 'money':
        return <Money />;
      case 'personOutline':
        return <PersonOutline />;
      case 'settings':
        return <Settings />;
      case 'shoppingCart':
        return <ShoppingCart />;
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
