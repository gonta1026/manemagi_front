import { BaseSwitch, BaseFormControlLabel, BaseHelperText } from '../../uiParts/atoms';

import React, { ReactNode } from 'react';

type TProps = {
  checked: boolean;
  helperText?: ReactNode;
  id: string;
  label: string;
  className?: string;
  value?: string;
  onChange: VoidFunction;
};

const LabelAndSwitch = ({
  checked,
  helperText = '',
  className = '',
  id = '',
  label,
  onChange,
}: TProps) => {
  return (
    <>
      <BaseFormControlLabel
        {...{ className, id, label }}
        control={<BaseSwitch {...{ checked, id, onChange }} color="primary" />}
      />
      {helperText && <BaseHelperText>{helperText}</BaseHelperText>}
    </>
  );
};

export default LabelAndSwitch;
