import { BaseSwitch, BaseFormControlLabel, BaseHelperText } from '../..';

import React, { ReactNode } from 'react';

type TProps = {
  checked: boolean;
  disabled?: boolean;
  helperText?: ReactNode;
  id: string;
  label: string;
  className?: string;
  value?: string;
  onChange: VoidFunction;
};

const LabelAndSwitch = ({
  checked,
  disabled,
  helperText = '',
  className = '',
  id = '',
  label,
  onChange,
}: TProps): JSX.Element => {
  return (
    <>
      <BaseFormControlLabel
        {...{ className, id, label }}
        control={<BaseSwitch {...{ checked, id, onChange, disabled }} color="primary" />}
      />
      {helperText && <BaseHelperText>{helperText}</BaseHelperText>}
    </>
  );
};

export default LabelAndSwitch;
