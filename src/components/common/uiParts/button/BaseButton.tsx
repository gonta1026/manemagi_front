import React, { ReactNode, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { buttonStyle } from './buttonStyle';
import BaseSwitchIcon, { TIconType } from './BaseSwitchIcon';

type TProps = {
  className?: string;
  children: ReactNode;
  customType?: TIconType;
  disabled?: boolean;
  focus?: boolean;
  onClick?: VoidFunction;
  type?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'medium' | 'small';
  variant?: 'contained' | 'outlined' | 'text';
};

const BaseButton = ({
  className = '',
  children,
  customType = 'normal',
  disabled,
  focus = false,
  onClick,
  size = 'medium',
  type = 'button',
  variant = 'outlined',
}: TProps): JSX.Element => {
  const CustomButton = withStyles((theme) => ({
    root: buttonStyle(theme, customType, variant),
  }))(Button);

  const inputEl = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (focus) {
        inputEl.current?.focus();
      }
    }, 100);
  }, []);

  return (
    <CustomButton
      ref={inputEl}
      className={className}
      disabled={disabled}
      onClick={onClick}
      size={size}
      startIcon={<BaseSwitchIcon icon={customType} />}
      type={type}
      variant={variant}
    >
      {children}
    </CustomButton>
  );
};

export default BaseButton;
