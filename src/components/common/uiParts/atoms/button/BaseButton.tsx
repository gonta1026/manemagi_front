import React, { ReactNode, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { AddCircleOutline, Delete, Update, ArrowBack, Search } from '@material-ui/icons';

const BaseButton = ({
  className = '',
  children,
  color = 'default',
  disabled,
  focus = false,
  onClick,
  size = 'medium',
  startIcon = '',
  type = 'button',
  variant,
}: {
  className?: string;
  children: ReactNode;
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  disabled?: boolean;
  focus?: boolean;
  onClick?: VoidFunction;
  type?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'medium' | 'small';
  startIcon?: 'addCircleOutline' | 'update' | 'delete' | 'arrowBack' | 'search' | '';
  variant: 'contained' | 'outlined' | 'text';
}) => {
  const switchIcon = (startIcon: string) => {
    switch (startIcon) {
      case 'addCircleOutline':
        return <AddCircleOutline />;
      case 'update':
        return <Update />;
      case 'delete':
        return <Delete />;
      case 'arrowBack':
        return <ArrowBack />;
      case 'search':
        return <Search />;
      default:
        return;
    }
  };

  const inputEl = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (focus) {
      inputEl.current?.focus();
    }
  }, []);

  return (
    <Button
      ref={inputEl}
      className={className}
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      startIcon={switchIcon(startIcon)}
      type={type}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
