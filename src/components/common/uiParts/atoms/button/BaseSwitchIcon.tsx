import {
  AddCircleOutline,
  Delete,
  Description,
  Update,
  ArrowBack,
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
  | 'normal'
  | 'update'
  | 'search'
  | '';

const BaseSwitchIcon = ({ icon = '' }: { icon: TIconType }): JSX.Element => {
  const switchIcon = (icon: string) => {
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
