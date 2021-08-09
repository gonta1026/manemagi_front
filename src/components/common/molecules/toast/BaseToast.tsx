import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { OmitTToastType } from '../../../../customHook/useToastAction';
import { materialStyles } from '../../../../styles/js/material';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BaseToast = ({
  open,
  message,
  severity = 'info',
  autoHideDuration,
  onClose,
}: OmitTToastType) => {
  // NOTE  スマホ表示の際に崩れる現象があったので非表示で対応
  const classes = materialStyles({
    alert: {
      '& .MuiAlert-icon': {
        '@media (max-width: 768px)': {
          display: 'none',
        },
      },
      '& .MuiAlert-action': {
        '@media (max-width: 768px)': {
          display: 'none',
        },
      },
    },
  });
  const anchorOrigin = { horizontal: 'right', vertical: 'top' } as const;
  return (
    <Snackbar {...{ anchorOrigin, autoHideDuration, onClose, open }}>
      <Alert className={classes.alert} {...{ onClose, severity }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BaseToast;
