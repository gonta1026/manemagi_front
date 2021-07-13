import { useState } from 'react';

type TSeverity = 'info' | 'success' | 'error' | 'warning' | '';
export interface ToastType {
  handleToastOpen: ({ message, severity, autoHideDuration }: OmitTToastOpenType) => void;
  onClose: (_: any, reason: string) => void;
  severity?: TSeverity;
  autoHideDuration?: number;
  open: boolean;
  message: string;
}

export type OmitTToastType = Omit<ToastType, 'handleToastOpen'>;

export type OmitTToastOpenType = Omit<ToastType, 'handleToastOpen' | 'onClose' | 'open'>;

const useToastAction = (): ToastType => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<TSeverity>('');
  const [autoHideDuration, setAutoHideDuration] = useState<number>(0);

  const handleToastOpen = ({
    severity = 'info',
    message,
    autoHideDuration = 4000,
  }: OmitTToastOpenType) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
    setAutoHideDuration(autoHideDuration);
  };

  const onClose = (_: any, reason: string) => {
    // NOTE 'clickaway'は公式の指定
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return {
    handleToastOpen,
    onClose,
    open,
    message,
    severity,
    autoHideDuration,
  };
};

export default useToastAction;
