import React from 'react';
import { Checkbox } from '@material-ui/core/';

const CheckBox = ({
  checked,
  className,
  color = 'primary',
  onChange,
}: {
  checked: boolean;
  color?: 'primary' | 'default' | 'secondary';
  className?: string;
  onChange: any;
}) => {
  return (
    <Checkbox
      {...{ checked, className, color, onChange }}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default CheckBox;
