import { BaseSwitch, BaseFormControlLabel } from '../uiParts/atoms';

import React from 'react';

type TProps = {
  checked: boolean;
  id: string;
  label: string;
  className?: string;
  value?: string;
  onChange: VoidFunction;
};

const LabelAndSwitch = ({ checked, className = '', id = '', label, onChange }: TProps) => {
  return (
    <BaseFormControlLabel
      {...{ className, id, label }}
      control={<BaseSwitch {...{ checked, id, onChange }} color="primary" />}
    />
  );
};

export default LabelAndSwitch;
