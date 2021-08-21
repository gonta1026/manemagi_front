import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
/* styles */
import { materialStyles } from '../../../../styles/js/material';

const BaseLoading = ({ open = false }: { open: boolean }) => {
  const classNames = {
    backDrop: {
      zIndex: 1301, // モーダルmaskの上を指定。
    },
    progress: {
      color: '#fff',
    },
  };
  const classes = materialStyles(classNames) as Record<keyof typeof classNames, string>;

  return (
    <Backdrop {...{ open }} className={classes.backDrop}>
      <CircularProgress color="inherit" className={classes.progress} />
    </Backdrop>
  );
};

export default BaseLoading;
