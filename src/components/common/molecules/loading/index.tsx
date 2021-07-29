import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
/* styles */
import { materialStyles } from '../../../../styles/js/material';

const BaseLoading = ({ open = false }: { open: boolean }) => {
  const classes = materialStyles({
    progress: {
      color: '#fff',
    },
  });
  return (
    <Backdrop {...{ open }}>
      <CircularProgress color="inherit" className={classes.progress} />
    </Backdrop>
  );
};

export default BaseLoading;
