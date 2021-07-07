import React from 'react';
import TextField from '@material-ui/core/TextField';

export type TSize = 'medium' | 'small';
export type TVariant = 'filled' | 'outlined' | 'standard';

const BaseTextArea = ({
  className = '',
  disabled,
  fullWidth = true,
  id,
  onBlur,
  onChange,
  required = false,
  size = 'small',
  value,
  variant = 'outlined',
  rows,
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
  rows: number;
}) => {
  return (
    <TextField
      multiline
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
        rows,
      }}
    />
  );
};

export default BaseTextArea;
