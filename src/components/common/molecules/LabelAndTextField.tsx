import React, { ReactNode } from 'react';
import { BaseLabel, BaseRequired, BaseTextField } from '../uiParts/atoms';
import { TSize, TVariant } from '../uiParts/atoms/form/BaseTextField';
import useIsAfterSsr from '../../../customHook/useIsAfterSsr';

type TProps = {
  FieldClass?: string;
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  onBlur: any;
  onChange: any;
  required?: boolean;
  value: string;
  size?: TSize;
  type?: 'text' | 'password';
  variant?: TVariant;
  wrapClass?: string;
  labelClass?: string;
};

const LabelAndTextField = ({
  FieldClass = '',
  children,
  disabled,
  fullWidth = true,
  id,
  label,
  onBlur,
  onChange,
  required = false,
  size = 'small',
  type = 'text',
  value,
  variant = 'outlined',
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
            {required ? <BaseRequired>必須</BaseRequired> : ''}
          </BaseLabel>
          <BaseTextField
            {...{
              disabled,
              fullWidth,
              id,
              onBlur,
              onChange,
              value,
              size,
              type,
              variant,
            }}
            className={FieldClass}
          />
          {children}
        </div>
      )}
    </>
  );
};

export default LabelAndTextField;
