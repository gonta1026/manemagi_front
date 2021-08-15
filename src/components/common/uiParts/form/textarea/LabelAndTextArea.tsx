import React, { ReactNode } from 'react';
import { BaseLabel, BaseTextArea } from '../..';
import { TSize, TVariant } from '../textfield/BaseTextField';
import useIsAfterSsr from '../../../../../customHook/useIsAfterSsr';

type TProps = {
  AreaClass?: string;
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  onBlur: any;
  onChange: any;
  value: string;
  size?: TSize;
  variant?: TVariant;
  rows?: number;
  placeholder?: string;
  wrapClass?: string;
  labelClass?: string;
};

const LabelAndTextArea = ({
  AreaClass = '',
  children,
  disabled,
  fullWidth = true,
  id,
  label,
  onBlur,
  onChange,
  size = 'small',
  value,
  variant = 'outlined',
  rows = 3,
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
            className={AreaClass}
          />
          {children}
        </div>
      )}
    </>
  );
};

export default LabelAndTextArea;
