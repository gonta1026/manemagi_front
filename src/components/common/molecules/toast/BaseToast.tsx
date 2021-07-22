import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { OmitTToastType } from '../../../../customHook/useToastAction';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BaseToast = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 4000,
  onClose,
}: OmitTToastType) => {
  const anchorOrigin = { horizontal: 'right', vertical: 'top' } as const;
  return (
    <Snackbar {...{ anchorOrigin, autoHideDuration, onClose, open }}>
      <Alert {...{ onClose, severity }}>{message}</Alert>
    </Snackbar>
  );
};

export default BaseToast;
