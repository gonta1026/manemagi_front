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
  placeholder = '',
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
  placeholder?: string;
}) => {
  return (
    <TextField
      multiline
      placeholder={placeholder ? `例：${placeholder} ` : ''}
      {...{
        className,
        disabled,
        fullWidth,
        id,
        onBlur,
        onChange,
        required,
        rows,
        size,
        value,
        variant,
      }}
    />
  );
};

export default BaseTextArea;
