import React, { useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export type TSize = 'medium' | 'small';
export type TVariant = 'filled' | 'outlined' | 'standard';
export type TType = 'text' | 'password' | 'date' | 'number';

const BaseTextField = ({
  className = '',
  disabled,
  focus = false,
  fullWidth = true,
  id,
  onBlur,
  onChange,
  required,
  size = 'small',
  type,
  value,
  variant = 'outlined',
}: {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  focus?: boolean;
  id: string;
  onBlur: any;
  onChange: any;
  required?: boolean;
  value: string | number;
  size?: TSize;
  type?: TType;
  variant?: TVariant;
}) => {
  const inputEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (focus) {
      inputEl.current?.focus();
    }
  }, []);

  return (
    <TextField
      inputRef={inputEl}
      {...{
        className,
        disabled,
        fullWidth,
        id,
        onBlur,
        onChange,
        required,
        size,
        type,
        value,
        variant,
      }}
    />
  );
};

export default BaseTextField;
