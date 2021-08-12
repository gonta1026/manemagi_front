import React, { ReactNode } from 'react';
import { BaseLink, BaseButton } from '..';
import { TIconType } from '../button/BaseSwitchIcon';

const BaseLinkButton = ({
  className,
  customType,
  children,
  disabled,
  pathname,
  size,
  variant,
}: {
  className?: string;
  customType?: TIconType;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  pathname: string;
  size?: 'large' | 'medium' | 'small';
  children: ReactNode;
}) => {
  return (
    <BaseLink pathname={pathname}>
      <BaseButton {...{ className, customType, variant, disabled, size }}>{children}</BaseButton>
    </BaseLink>
  );
};
export default BaseLinkButton;
