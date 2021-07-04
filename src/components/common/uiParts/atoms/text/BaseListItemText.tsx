import React from 'react';
import { ListItemText } from '@material-ui/core/';

const BaseListItemText = ({
  className,
  primary,
}: {
  className?: string;
  primary: string;
}): JSX.Element => <ListItemText className={className} primary={primary} />;

export default BaseListItemText;
