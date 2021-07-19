import React from 'react';
import { Switch } from '@material-ui/core';

const BaseSwitch = ({
  className = '',
  checked,
  color = 'default',
  disabled = false,
  id,
  name = '',
  onChange,
  size = 'medium',
}: {
  className?: string;
  checked: boolean;
  color?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
  id: string;
  name?: string;
  onChange: any; // 型をvoidやvoidfunctionにすると弾かれる
  size?: 'medium' | 'small';
}) => {
  return (
    <Switch
      className={className}
      checked={checked}
      color={color}
      onChange={onChange}
      id={id}
      size={size}
      name={name}
      disabled={disabled}
    />
  );
};

export default BaseSwitch;
