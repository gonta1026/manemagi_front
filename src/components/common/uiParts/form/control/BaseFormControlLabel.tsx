import React from 'react';
import { FormControlLabel } from '@material-ui/core';

const BaseFormControlLabel = ({
  className = '',
  control,
  label,
  id,
  labelPlacement = 'end',
}: {
  className?: string;
  control: JSX.Element;
  label: string;
  id?: string;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
}): JSX.Element => {
  return <FormControlLabel {...{ className, control, id, label, labelPlacement }} />;
};

export default BaseFormControlLabel;
