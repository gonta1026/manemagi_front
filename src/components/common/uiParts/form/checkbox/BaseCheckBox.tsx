import React from 'react';
import { Checkbox } from '@material-ui/core/';

const CheckBox = ({
  checked,
  className,
  color = 'primary',
  id,
  onChange,
}: {
  checked: boolean;
  color?: 'primary' | 'default' | 'secondary';
  className?: string;
  id?: string;
  onChange: any;
}): JSX.Element => {
  return (
    <Checkbox
      {...{ checked, className, color, id, onChange }}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default CheckBox;
