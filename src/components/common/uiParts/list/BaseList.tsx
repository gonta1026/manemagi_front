import React, { ReactNode } from 'react';
import { List } from '@material-ui/core/';

const BaseList = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element => <List {...{ className }}>{children}</List>;

export default BaseList;
