import React from 'react';
import { BaseLabel, BaseTextArea } from '../uiParts/atoms';
import { TSize, TVariant } from '../uiParts/atoms/form/BaseTextField';
import useIsAfterSsr from '../../../customHook/useIsAfterSsr';

type TProps = {
  FieldClass?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  onBlur: any;
  onChange: any;
  value: string;
  size?: TSize;
  variant?: TVariant;
  rows: number;
  placeholder?: string;
  wrapClass?: string;
  labelClass?: string;
};

const LabelAndTextField = ({
  FieldClass = '',
  disabled,
  fullWidth = true,
  id,
  label,
  onBlur,
  onChange,
  size = 'small',
  value,
  variant = 'outlined',
  rows,
  placeholder,
  wrapClass = '',
  labelClass = '',
}: TProps) => {
  const isAfterSsr = useIsAfterSsr();
  return (
    <>
      {isAfterSsr && (
        <div className={wrapClass}>
          <BaseLabel htmlFor={id} className={labelClass}>
            {label}
          </BaseLabel>
          <BaseTextArea
            {...{
              disabled,
              fullWidth,
              id,
              onBlur,
              onChange,
              value,
              size,
              variant,
              rows,
              placeholder,
            }}
            className={FieldClass}
          />
        </div>
      )}
    </>
  );
};

export default LabelAndTextField;
