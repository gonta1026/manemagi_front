import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import { AddCircleOutline } from '@material-ui/icons';

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
  type?: string;
  size?: 'large' | 'medium' | 'small';
  startIcon?: 'AddCircleOutline' | '';
  variant: 'contained' | 'outlined' | 'text';
}) => {
  const switchIcon = (startIcon: string) => {
    switch (startIcon) {
      case 'AddCircleOutline':
        <AddCircleOutline />;
        break;
      default:
        return;
    }
    return <AddCircleOutline />;
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
