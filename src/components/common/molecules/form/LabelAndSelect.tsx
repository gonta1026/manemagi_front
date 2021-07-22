import { BaseLabel, BaseFormControl, BaseSelect } from '../../uiParts/atoms';

import React, { useState } from 'react';
type TProps = {
  id: string;
  label: string;
  options: {
    name: string;
    value: string;
  }[];
  className?: string;
  value: string;
  onChange: any;
};

const LabelAndSelect = ({ className = '', id = '', label, onChange, options, value }: TProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <BaseLabel htmlFor={id} onClick={() => setOpen(true)} className={className + ' block'}>
        {label}
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
