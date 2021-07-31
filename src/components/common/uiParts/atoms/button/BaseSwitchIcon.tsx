import React from 'react';
export type TIconType =
  | 'addCircleOutline'
  | 'update'
  | 'delete'
  | 'arrowBack'
  | 'search'
  | 'normal'
  | '';
import { AddCircleOutline, Delete, Update, ArrowBack, Search } from '@material-ui/icons';

const BaseSwitchIcon = ({ icon = '' }: { icon: TIconType }): JSX.Element => {
  const switchIcon = (icon: string) => {
    switch (icon) {
      case 'addCircleOutline':
        return <AddCircleOutline />;
      case 'update':
        return <Update />;
      case 'delete':
        return <Delete />;
      case 'arrowBack':
        return <ArrowBack />;
      case 'search':
        return <Search />;
      default:
        return;
    }
  };

  return <>{switchIcon(icon)}</>;
};

export default BaseSwitchIcon;
