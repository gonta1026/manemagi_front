import React from 'react';
import TextField from '@material-ui/core/TextField';

export type TSize = 'medium' | 'small';
export type TVariant = 'filled' | 'outlined' | 'standard';

const BaseTextField = ({
  className = '',
  disabled,
  fullWidth = true,
  id,
  onBlur,
  onChange,
  required,
  size = 'small',
  value,
  variant = 'outlined',
}: {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  id: string;
  onBlur: any;
  onChange: any;
  required?: boolean;
  value: string;
  size?: TSize;
  variant?: TVariant;
}) => {
  return (
    <TextField
      {...{
        className,
        disabled,
        fullWidth,
        id,
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
