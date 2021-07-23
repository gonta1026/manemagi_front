import React, { useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export type TSize = 'medium' | 'small';
export type TVariant = 'filled' | 'outlined' | 'standard';
export type TType = 'text' | 'password' | 'date' | 'number';

type TBaseTextField = {
  className?: string;
  disabled?: boolean;
  focus?: boolean;
  fullWidth?: boolean;
  id: string;
  onBlur: any;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  size?: TSize;
  type?: TType;
  value: string | number;
  variant?: TVariant;
};

const BaseTextField = ({
  className = '',
  disabled,
  focus = false,
  fullWidth = true,
  id,
  onBlur,
  onChange,
  placeholder = '',
  required,
  size = 'small',
  type,
  value,
  variant = 'outlined',
}: TBaseTextField) => {
  const inputEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (focus) {
      inputEl.current?.focus();
    }
  }, []);

  return (
    <TextField
      inputRef={inputEl}
      placeholder={placeholder ? `例：${placeholder} ` : ''}
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
