import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { AddCircleOutline, Delete, Update, ArrowBack } from '@material-ui/icons';

const BaseButton = ({
  className = '',
  children,
  color = 'default',
  disabled,
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
  onClick: VoidFunction;
  type?: 'button' | 'submit' | 'reset';
  size?: 'large' | 'medium' | 'small';
  startIcon?: 'addCircleOutline' | 'update' | 'delete' | 'arrowBack' | '';
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
      default:
        return;
    }
  };

  return (
    <Button
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
