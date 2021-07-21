import React from 'react';
import { FormControlLabel } from '@material-ui/core';

const BaseFormControlLabel = ({
  className = '',
  control,
  label,
  id,
}: {
  className?: string;
  control: JSX.Element;
  label: string;
  id: string;
}) => {
  return <FormControlLabel {...{ className, control, label, id }} />;
};

export default BaseFormControlLabel;
