import React, { ReactNode } from 'react';
import { MenuItem } from '@material-ui/core';

// WARNING 原因がまだ分かっていないが当コンポーネントを使用するとエラーがでる。
const BaseMenuItem = ({
  className = '',
  children,
  value,
}: {
  className?: string;
  children: ReactNode;
  value: string;
}) => {
  return <MenuItem {...{ className, value }}>{children}</MenuItem>;
};

export default BaseMenuItem;
