import React, { ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';

const BaseTextField = ({
  className = '',
  disabled,
  fullWidth = true,
  id,
  label,
  onBlur,
  onChange,
  required = false,
  size = 'small',
  value,
  variant = 'outlined',
}: {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  onBlur: any;
  onChange: any;
  required?: boolean;
  value: string;
  size?: 'medium' | 'small';
  variant?: 'filled' | 'outlined' | 'standard';
}) => {
  return (
    <TextField
      {...{
        className,
        disabled,
        fullWidth,
        id,
        label,
        onBlur,
        onChange,
        required,
        value,
        size,
        variant,
      }}
    />
  );
};

export default BaseTextField;
