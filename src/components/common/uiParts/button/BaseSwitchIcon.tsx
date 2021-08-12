import {
  AddCircleOutline,
  ArrowBack,
  Delete,
  Description,
  Receipt,
  Update,
  Search,
  Edit,
} from '@material-ui/icons';
import React from 'react';
export type TIconType =
  | 'addCircleOutline'
  | 'arrowBack'
  | 'delete'
  | 'description'
  | 'edit'
  | 'receipt'
  | 'normal'
  | 'update'
  | 'search'
  | '';

const BaseSwitchIcon = ({ icon = '' }: { icon: TIconType }): JSX.Element => {
  const switchIcon = (icon: TIconType) => {
    switch (icon) {
      case 'addCircleOutline':
        return <AddCircleOutline />;
      case 'arrowBack':
        return <ArrowBack />;
      case 'delete':
        return <Delete />;
      case 'description':
        return <Description />;
      case 'edit':
        return <Edit />;
      case 'receipt':
        return <Receipt />;
      case 'update':
        return <Update />;
      case 'search':
        return <Search />;
      case 'normal':
        return <></>;
      default:
        return;
    }
  };

  return <>{switchIcon(icon)}</>;
};

export default BaseSwitchIcon;
