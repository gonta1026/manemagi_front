import React from 'react';
import Switch from '@material-ui/core/Switch';

const BaseSwitch = ({
  className = '',
  checked,
  color = 'default',
  onChange,
  size = 'medium',
  name = '',
  disabled = false,
}: {
  className?: string;
  checked: boolean;
  color?: 'default' | 'primary' | 'secondary';
  onChange: any; // 型をvoidやvoidfunctionにすると弾かれる
  size?: 'medium' | 'small';
  name?: string;
  disabled?: boolean;
}) => {
  return (
    <Switch
      className={className}
      checked={checked}
      color={color}
      onChange={onChange}
      size={size}
      name={name}
      disabled={disabled}
    />
  );
};

export default BaseSwitch;
