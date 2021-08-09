import React, { ReactNode } from 'react';
import { Dialog } from '@material-ui/core';

interface TProps {
  open: boolean;
  handleClose: VoidFunction;
  children: ReactNode;
}

const BaseModal = ({ children, handleClose, open }: TProps): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      {children}
    </Dialog>
  );
};

export default BaseModal;
