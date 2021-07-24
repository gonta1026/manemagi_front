import React, { ReactNode } from 'react';
import { ListItem } from '@material-ui/core/';

const BaseListItem = ({
  className,
  children,
  selected = false,
}: {
  className?: string;
  children: ReactNode;
  selected?: boolean;
}): JSX.Element => <ListItem {...{ className, selected }}>{children}</ListItem>;

export default BaseListItem;
