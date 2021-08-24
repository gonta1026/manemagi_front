import React, { ReactNode } from 'react';
import { Drawer } from '@material-ui/core/';

const BaseDrawer = ({
  children,
  className = '',
  open,
  onClose,
}: {
  children: ReactNode;
  className?: string;
  open: any;
  onClose: any;
}): JSX.Element => {
  return (
    <Drawer anchor={'left'} open={open} onClose={onClose(false)} className={className}>
      {children}
    </Drawer>
  );
};

export default BaseDrawer;
