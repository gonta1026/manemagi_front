import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const BaseLoading = ({ open = false }: { open: boolean }) => {
  return (
    <Backdrop {...{ open }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BaseLoading;
