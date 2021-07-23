import { BaseLabel, BaseFormControl, BaseSelect, BaseRequired } from '../../uiParts/atoms';
import { TOptions } from '../../uiParts/atoms/form/BaseSelect';

import React, { useState } from 'react';
type TProps = {
  className?: string;
  id: string;
  label: string;
  onChange: any;
  options: TOptions;
  required: boolean;
  value: number | string;
};

const LabelAndSelect = ({
  className = '',
  id = '',
  label,
  onChange,
  options,
  required,
  value,
}: TProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <BaseLabel htmlFor={id} onClick={() => setOpen(true)} className={className}>
        {label}
        {required ? <BaseRequired>必須</BaseRequired> : ''}
      </BaseLabel>
      <BaseFormControl {...{ id }}>
        <BaseSelect
          id={id}
          value={value}
          onChange={onChange}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          options={options}
        />
      </BaseFormControl>
    </div>
  );
};

export default LabelAndSelect;
