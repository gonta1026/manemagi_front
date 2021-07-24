import React, { ReactNode } from 'react';
import { BaseLabel, BaseRequired, BaseTextField, BaseHelperText } from '../../uiParts/atoms';
import { TSize, TVariant, TType } from '../../uiParts/atoms/form/BaseTextField';
import useIsAfterSsr from '../../../../customHook/useIsAfterSsr';

type TProps = {
  FieldClass?: string;
  children: ReactNode;
  disabled?: boolean;
  focus?: boolean;
  helperText?: ReactNode;
  helperClassName?: string;
  fullWidth?: boolean;
  id: string;
  label: string;
  onBlur: any;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  value: string | number | Date;
  size?: TSize;
  type?: TType;
  variant?: TVariant;
  wrapClass?: string;
  labelClass?: string;
};

const LabelAndTextField = ({
  FieldClass = '',
  children,
  disabled,
  focus = false,
  fullWidth = true,
  helperText = '',
  helperClassName = '',
  id,
  label,
  onBlur,
  onChange,
  placeholder,
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
              focus,
              fullWidth,
              id,
              onBlur,
              onChange,
              placeholder,
              value,
              size,
              type,
              variant,
            }}
            className={FieldClass}
          />
          {helperText && <BaseHelperText className={helperClassName}>{helperText}</BaseHelperText>}
          {children}
        </div>
      )}
    </>
  );
};

export default LabelAndTextField;
