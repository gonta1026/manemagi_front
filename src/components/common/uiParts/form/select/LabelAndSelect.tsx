import React, { useState, ReactNode } from 'react';
import { BaseLabel, BaseFormControl, BaseSelect, BaseRequired, BaseHelperText } from '../..';
import { TOptions } from './BaseSelect';

type TProps = {
  className?: string;
  id: string;
  label: string;
  helperText?: ReactNode;
  helperClassName?: string;
  onChange: any;
  options: TOptions;
  required: boolean;
  value: number | string;
};

const LabelAndSelect = ({
  className = '',
  id = '',
  label,
  helperText,
  helperClassName,
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
      {helperText && <BaseHelperText className={helperClassName}>{helperText}</BaseHelperText>}
    </div>
  );
};

export default LabelAndSelect;
